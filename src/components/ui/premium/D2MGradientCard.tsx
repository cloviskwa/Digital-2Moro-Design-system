'use client';

import type { ElementType, HTMLAttributes, MouseEvent as ReactMouseEvent } from 'react';

export type D2MGradientCardVariant =
  | 'data-sync'
  | 'reporting'
  | 'orbit'
  | 'setup'
  | 'footer-cta'
  | 'hero-panel';

export interface D2MGradientCardProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
  /** Which of the six blue gradient-surface variants to render. */
  variant: D2MGradientCardVariant;
  className?: string;
  /** Rendered tag — defaults to `div`; pass `section` for the footer-cta/hero-panel variants. */
  as?: ElementType;
  /**
   * Opt-in cursor-tracking spotlight + direction-following border glow
   * (`.d2m-gradient-mouse-glow-layer` / `.d2m-gradient-mouse-border-glow`)
   * — real child elements whose position is driven by
   * --d2m-mouse-x/--d2m-mouse-y, written on `onMouseMove` and cleared on
   * `onMouseLeave` (so both ease back to their default top-center
   * position). Off by default so plain variants stay a client-safe static
   * background with zero JS.
   */
  mouseGlow?: boolean;
}

const handleMouseMove = (event: ReactMouseEvent<HTMLElement>) => {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  target.style.setProperty('--d2m-mouse-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
  target.style.setProperty('--d2m-mouse-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
};

const handleMouseLeave = (event: ReactMouseEvent<HTMLElement>) => {
  event.currentTarget.style.removeProperty('--d2m-mouse-x');
  event.currentTarget.style.removeProperty('--d2m-mouse-y');
};

/**
 * Thin class-name wrapper around the CSS-only `.d2m-gradient-surface`
 * system (`src/app/d2m-public-tokens.css`) — every variant, texture and
 * glow is plain CSS (layered `radial-gradient()` backgrounds + a grid
 * `::before`), so this component does nothing but compose
 * `d2m-gradient-surface d2m-gradient-<variant>` with any caller-supplied
 * `className`. No motion library, no canvas, no image assets. The optional
 * `mouseGlow` spotlight/border is the one bit of real JS (a couple of
 * `style.setProperty`/`removeProperty` calls per event), which is why this
 * file is a client component.
 *
 * Not wired into any page — a caller opts in explicitly:
 *   <D2MGradientCard variant="reporting" mouseGlow>
 *     <div className="d2m-gradient-inner-panel">...</div>
 *   </D2MGradientCard>
 */
export default function D2MGradientCard({
  variant,
  className,
  as: Tag = 'div',
  mouseGlow = false,
  children,
  onMouseMove,
  onMouseLeave,
  ...rest
}: D2MGradientCardProps) {
  const classes = ['d2m-gradient-surface', `d2m-gradient-${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      className={classes}
      onMouseMove={
        mouseGlow
          ? (event: ReactMouseEvent<HTMLElement>) => {
              handleMouseMove(event);
              onMouseMove?.(event);
            }
          : onMouseMove
      }
      onMouseLeave={
        mouseGlow
          ? (event: ReactMouseEvent<HTMLElement>) => {
              handleMouseLeave(event);
              onMouseLeave?.(event);
            }
          : onMouseLeave
      }
      {...rest}
    >
      {children}
      {mouseGlow ? (
        <>
          <span className="d2m-gradient-mouse-glow-layer" aria-hidden="true" />
          <span className="d2m-gradient-mouse-border-glow" aria-hidden="true" />
        </>
      ) : null}
    </Tag>
  );
}
