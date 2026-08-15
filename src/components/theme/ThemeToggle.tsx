'use client';

/**
 * The first visible consumer of the theme architecture (Phase 15A) and
 * persistence (Phase 15B). A compact three-way segmented control — Dark /
 * Light / System — modeled on the WAI-ARIA "radio group" pattern (mutually
 * exclusive choice, roving tabindex, arrow-key navigation), the same
 * keyboard model `Tabs` (`src/components/ui/controls/Tabs.tsx`, Phase 16A)
 * already uses in this codebase.
 *
 * Reads/writes exclusively through `useTheme()` — no direct `localStorage`
 * or `document` access here. Icons come only from the central registry
 * (`src/components/icons`), never a direct `@tabler/icons-react` import.
 */
import { useId, type KeyboardEvent } from 'react';
import { useTheme } from './useTheme';
import type { ThemeName } from '@/lib/theme/theme';
import { DashboardIcon, type IconName } from '@/components/icons';

export interface ThemeToggleProps {
  className?: string;
}

const THEME_OPTIONS: ReadonlyArray<{ value: ThemeName; label: string; icon: IconName }> = [
  { value: 'dark', label: 'Dark', icon: 'themeMoon' },
  { value: 'light', label: 'Light', icon: 'themeSun' },
  { value: 'system', label: 'System', icon: 'themeSystem' },
];

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const baseId = useId();

  const activeIndex = THEME_OPTIONS.findIndex((option) => option.value === theme);

  const focusOptionAt = (index: number) => {
    document.getElementById(`${baseId}-${THEME_OPTIONS[index]?.value}`)?.focus();
  };

  const selectAt = (index: number) => {
    const option = THEME_OPTIONS[index];
    if (!option) return;
    setTheme(option.value);
    focusOptionAt(index);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      selectAt((activeIndex + 1 + THEME_OPTIONS.length) % THEME_OPTIONS.length);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      selectAt((activeIndex - 1 + THEME_OPTIONS.length) % THEME_OPTIONS.length);
    } else if (event.key === 'Home') {
      event.preventDefault();
      selectAt(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      selectAt(THEME_OPTIONS.length - 1);
    }
  };

  return (
    <div
      className={['d2m-theme-toggle', className].filter(Boolean).join(' ')}
      role="radiogroup"
      aria-label="Theme"
      onKeyDown={handleKeyDown}
    >
      {THEME_OPTIONS.map((option, index) => {
        const isActive = option.value === theme;
        return (
          <button
            key={option.value}
            id={`${baseId}-${option.value}`}
            type="button"
            role="radio"
            aria-checked={isActive}
            tabIndex={isActive ? 0 : -1}
            className={['d2m-theme-toggle__option', isActive && 'd2m-theme-toggle__option--active']
              .filter(Boolean)
              .join(' ')}
            onClick={() => selectAt(index)}
          >
            <DashboardIcon name={option.icon} variant="plain" size="sm" />
            <span className="d2m-theme-toggle__label">{option.label}</span>
            {isActive ? <DashboardIcon name="check" variant="plain" size="sm" /> : null}
          </button>
        );
      })}
    </div>
  );
}
