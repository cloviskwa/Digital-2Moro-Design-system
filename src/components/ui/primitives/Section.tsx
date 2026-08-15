import type { HTMLAttributes } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Render as a `<div>` instead of a semantic `<section>` (e.g. nested sub-sections). */
  as?: 'section' | 'div';
}

/** Vertical section rhythm — mobile-first `padding-block` via `--d2m-section-space`. */
export default function Section({ as = 'section', className, children, ...rest }: SectionProps) {
  const Tag = as;
  return (
    <Tag className={['d2m-section', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  );
}
