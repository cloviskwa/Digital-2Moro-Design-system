import type { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds hover/focus lift + background shift (plain CSS, no motion library) for clickable cards. */
  interactive?: boolean;
}

/**
 * Card base — bordered panel surface. Compose `d2m-card__title` / `d2m-card__description`
 * classes on child elements for the reference title/description treatment; this primitive only
 * owns the outer surface, not a fixed internal layout.
 */
export default function Card({ interactive = false, className, children, ...rest }: CardProps) {
  const classes = ['d2m-card', interactive && 'd2m-card--interactive', className]
    .filter(Boolean)
    .join(' ');
  return (
    <div
      className={classes}
      // Phase 16D fix: an `interactive` card previously got the hover/focus
      // *visual* treatment but was never actually reachable by keyboard
      // unless the consumer remembered to pass `tabIndex` themselves — a
      // real gap, not just a missing nicety. `...rest` is spread after,
      // so an explicit tabIndex from the consumer still wins.
      tabIndex={interactive ? 0 : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}
