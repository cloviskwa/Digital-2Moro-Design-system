import Script from 'next/script';
import { DEFAULT_THEME, THEME_STORAGE_KEY } from '@/lib/theme/theme';

/**
 * Sets `data-theme` on `<html>` before hydration, to avoid a flash of the
 * wrong theme once Phase 15B adds real persistence. Uses `next/script`'s
 * `beforeInteractive` strategy (ships with Next.js — no new dependency),
 * the strategy Next's own docs recommend specifically for this "avoid
 * theme-flicker" use case: it runs before hydration and is safe to drop
 * into a Server Component layout (the `Script` component manages its own
 * client boundary internally, so `ThemeScript` itself needs no
 * `'use client'`).
 *
 * Today this is a no-op in practice: nothing writes to `localStorage` yet
 * (persistence is Phase 15B; there is no toggle to invoke it, Phase 15C),
 * so `localStorage.getItem` always returns `null` and the script always
 * falls through to the `'dark'` default — identical to the CSS default
 * already in `themes/dark.css`. It's wired in now, not left inert, so the
 * full read → resolve → apply pipeline is exercised and provably correct
 * (verified in the compiled build, not just assumed — see
 * docs/design/phase-15a-theme-architecture.md §4) ahead of Phase 15B only
 * needing to add the write side, not invent this script from scratch.
 *
 * Kept deliberately framework-free (no import of theme.ts's functions —
 * inline scripts can't be bundled/imported) but mirrors `resolveTheme()`
 * exactly; keep both in sync if the resolution logic ever changes.
 *
 * Never reads secrets or `.env.local`; only ever touches its own
 * `localStorage` key and `matchMedia`, wrapped in try/catch so a browser
 * that blocks storage (private/incognito mode with storage disabled) just
 * silently keeps the CSS default instead of throwing.
 */
export default function ThemeScript() {
  const script = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var d=${JSON.stringify(DEFAULT_THEME)};var s=window.localStorage.getItem(k);var t=(s==='light'||s==='dark'||s==='system')?s:d;var r=t==='system'?(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'):t;document.documentElement.setAttribute('data-theme',r);}catch(e){}})();`;

  return (
    // This rule only recognizes the legacy Pages Router's pages/_document.js; Next's own
    // current App Router docs show this exact pattern (a beforeInteractive script placed
    // in the root layout) as the correct one — a known false positive for App Router.
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script id="d2m-theme-script" strategy="beforeInteractive">
      {script}
    </Script>
  );
}
