'use client';

/**
 * Client-side theme state bridge (Phase 15B), rebuilt on `useSyncExternalStore`
 * in Phase 15C once a real JSX consumer (`ThemeToggle`) needed to render
 * differently depending on `theme`/`resolvedTheme`. A plain `useState` lazy
 * initializer (15B's original approach) was safe only because nothing yet
 * rendered per-theme output: the server always sees `DEFAULT_THEME` (no
 * `window`), so a client component's *first* render during hydration reading
 * real `localStorage` would diverge from what the server rendered — a real
 * hydration mismatch as soon as any JSX (like which toggle segment shows
 * "active") depends on it. `useSyncExternalStore`'s `getServerSnapshot` is
 * React's own sanctioned fix for exactly this case: it forces the first
 * client render (during hydration) to match the server's value, then
 * re-renders with the real client value immediately after, with no mismatch
 * warning — see https://react.dev/reference/react/useSyncExternalStore
 * ("Hydrating server-rendered content").
 *
 * Deliberately a hook, not a Context/Provider (see
 * docs/design/phase-15a-theme-architecture.md §6): every mounted instance
 * subscribes independently to `THEME_CHANGE_EVENT`
 * (`src/lib/theme/persistence.ts`) and the OS `prefers-color-scheme` media
 * query, so multiple components stay in sync without a shared provider
 * higher in the tree.
 */
import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { DEFAULT_THEME, THEME_CHANGE_EVENT, resolveTheme } from '@/lib/theme/theme';
import type { ResolvedTheme, ThemeName } from '@/lib/theme/theme';
import {
  applyResolvedTheme,
  getEffectiveTheme,
  getSystemPrefersLight,
  persistTheme,
} from '@/lib/theme/persistence';

export interface UseThemeResult {
  /** The stored preference — what a toggle should show as "selected". */
  theme: ThemeName;
  /** What's actually applied to `data-theme` right now (`'system'` always resolves to one of these). */
  resolvedTheme: ResolvedTheme;
  /** Persists a new preference, applies it immediately, and notifies every other mounted `useTheme()`. */
  setTheme: (theme: ThemeName) => void;
}

/**
 * Shared by both `useSyncExternalStore` calls below: re-render whenever a
 * `persistTheme()` write fires `THEME_CHANGE_EVENT`, or whenever the OS-level
 * `prefers-color-scheme` flips (only actually changes `resolvedTheme`'s
 * snapshot when the active theme is `'system'` — otherwise the recomputed
 * snapshot is identical and React bails out of re-rendering).
 */
function subscribe(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const mediaQuery =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: light)')
      : null;

  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  mediaQuery?.addEventListener('change', onStoreChange);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
    mediaQuery?.removeEventListener('change', onStoreChange);
  };
}

const getThemeSnapshot = (): ThemeName => getEffectiveTheme();
const getThemeServerSnapshot = (): ThemeName => DEFAULT_THEME;

const getResolvedSnapshot = (): ResolvedTheme => resolveTheme(getEffectiveTheme(), getSystemPrefersLight());
const getResolvedServerSnapshot = (): ResolvedTheme => 'dark';

export function useTheme(): UseThemeResult {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getThemeServerSnapshot);
  const resolvedTheme = useSyncExternalStore(subscribe, getResolvedSnapshot, getResolvedServerSnapshot);

  // Keeps data-theme in sync with the resolved value whenever it changes —
  // a write from this or another mounted useTheme(), or a live OS-level
  // prefers-color-scheme flip while 'system' is selected. A DOM side effect,
  // not a setState call, so this is the sanctioned use of an effect ("update
  // external systems with the latest state from React"). In practice this is
  // usually a harmless no-op re-application: ThemeScript (Phase 15A) already
  // set the correct value before hydration.
  useEffect(() => {
    applyResolvedTheme(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = useCallback((next: ThemeName) => {
    persistTheme(next);
  }, []);

  return { theme, resolvedTheme, setTheme };
}
