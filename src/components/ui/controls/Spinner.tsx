import type { HTMLAttributes } from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'aria-label'> {
  size?: SpinnerSize;
  /** Accessible loading text — visually hidden, announced via `role="status"`. Defaults to "Loading". */
  label?: string;
}

/**
 * Loading spinner — a plain CSS `@keyframes` rotation (see `.d2m-spinner` in
 * components.css), not a motion library. Slows down (doesn't stop — a fully
 * static spinner gives no loading feedback) under `prefers-reduced-motion`.
 */
export default function Spinner({ size = 'md', label = 'Loading', className, ...rest }: SpinnerProps) {
  const classes = ['d2m-spinner', `d2m-spinner--${size}`, className].filter(Boolean).join(' ');
  return (
    <span className={classes} role="status" {...rest}>
      <span className="d2m-spinner__ring" aria-hidden="true" />
      <span className="d2m-sr-only">{label}</span>
    </span>
  );
}
