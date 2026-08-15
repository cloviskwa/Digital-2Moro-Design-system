import type { ReactNode } from 'react';

export interface SectionEyebrowProps {
  children: ReactNode;
  className?: string;
}

/**
 * Bracket eyebrow micro-label (Phase 16B) — the recurring `{ label _`
 * section-header motif from the NestJS reference brief
 * (`nestjs-ui-ux-technical-brief.md` §2), translated into our own mono
 * token/copy (no NestJS names or copy used). Purely presentational —
 * intentionally static/CSS-only, not every premium component needs motion.
 */
export default function SectionEyebrow({ children, className }: SectionEyebrowProps) {
  const classes = ['d2m-section-eyebrow', className].filter(Boolean).join(' ');

  return (
    <p className={classes}>
      <span aria-hidden="true">{'{ '}</span>
      {children}
      <span aria-hidden="true">{' _'}</span>
    </p>
  );
}
