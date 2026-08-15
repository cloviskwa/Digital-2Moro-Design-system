import type { ReactNode } from 'react';
import { MotionReveal } from '@/components/motion';

export interface DiagramFrameProps {
  children: ReactNode;
  /** Optional caption rendered below the frame. */
  caption?: string;
  className?: string;
}

/**
 * Bordered diagram/screenshot frame with a soft radial spotlight behind it
 * (Phase 16B) — for showcasing a mock dashboard/diagram/product UI, the
 * "product showcase" pattern from the NestJS/Mau reference brief (bordered
 * rounded frame + radial spotlight), translated into our own tokens. No
 * NestJS/Mau names, copy, or screenshots used as production content.
 *
 * A direct `MotionReveal` consumer (Phase 14E) — scales/fades in once
 * scrolled into view, reduced-motion-safe by construction since that's
 * `MotionReveal`'s own job, not reimplemented here.
 */
export default function DiagramFrame({ children, caption, className }: DiagramFrameProps) {
  const classes = ['d2m-diagram-frame', className].filter(Boolean).join(' ');

  return (
    <MotionReveal variant="scale" className={classes}>
      <div className="d2m-diagram-frame__spotlight" aria-hidden="true" />
      <div className="d2m-diagram-frame__inner">{children}</div>
      {caption ? <p className="d2m-diagram-frame__caption">{caption}</p> : null}
    </MotionReveal>
  );
}
