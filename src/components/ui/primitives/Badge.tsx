import type { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Solid blue-accent treatment instead of the default soft-bordered neutral badge. */
  accent?: boolean;
}

/** Small pill label — status/meta tags, e.g. content stage, category, count. */
export default function Badge({ accent = false, className, children, ...rest }: BadgeProps) {
  const classes = ['d2m-badge', accent && 'd2m-badge--accent', className]
    .filter(Boolean)
    .join(' ');
  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
