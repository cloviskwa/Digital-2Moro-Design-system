import type { HTMLAttributes } from 'react';
import { ICON_REGISTRY, type IconName } from './dashboard-icons';

export type IconSize = 'sm' | 'md' | 'lg';
export type IconVariant = 'boxed' | 'plain';

export interface DashboardIconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Registry key — see src/components/icons/dashboard-icons.tsx. */
  name: IconName;
  /** Wrapper + glyph size. `md` (default) matches the reference 40px box / 24px glyph. */
  size?: IconSize;
  /** `boxed` (default) = the 40x40-style hover/active box. `plain` = bare glyph, no box. */
  variant?: IconVariant;
  /** Forces the hover-like "white box / dark glyph" treatment persistently (e.g. current nav item). */
  active?: boolean;
  /**
   * Decorative (default `true`): the icon sits next to visible text, so it's `aria-hidden`.
   * Set to `false` (and pass `aria-label`) when the icon is the ONLY content conveying meaning.
   */
  decorative?: boolean;
  'aria-label'?: string;
}

const GLYPH_SIZE: Record<IconSize, number> = {
  sm: 20,
  md: 24,
  lg: 28,
};

/** Fixed stroke width for every platform icon — not a per-instance prop, so line weight stays consistent everywhere. */
const STROKE_WIDTH = 1.75;

/**
 * The ONE sanctioned way to render a Digital 2Moro icon. Despite the file
 * name (kept for cross-agent workstream consistency — see
 * docs/design/phase-14d-tabler-icon-system.md §2), this is general-purpose:
 * dashboard cards, menus, CTAs, link rows, and public sections should all
 * render icons through this component, never by importing a Tabler icon
 * directly.
 */
export default function DashboardIcon({
  name,
  size = 'md',
  variant = 'boxed',
  active = false,
  decorative = true,
  className,
  'aria-label': ariaLabel,
  ...rest
}: DashboardIconProps) {
  const Glyph = ICON_REGISTRY[name];

  const classes = [
    'd2m-icon-wrap',
    `d2m-icon-wrap--${size}`,
    variant === 'plain' && 'd2m-icon-wrap--plain',
    active && 'd2m-icon-wrap--active',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const a11yProps =
    decorative && !ariaLabel
      ? { 'aria-hidden': true as const }
      : { role: 'img' as const, 'aria-label': ariaLabel };

  return (
    <span className={classes} {...rest} {...a11yProps}>
      <Glyph size={GLYPH_SIZE[size]} stroke={STROKE_WIDTH} />
    </span>
  );
}
