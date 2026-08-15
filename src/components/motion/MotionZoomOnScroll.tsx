'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export interface MotionZoomOnScrollProps {
  className?: string;
  /** Scale at the top of the range, before the element reaches the trigger
   * point. Default `0.88` (bexon's `.zoom-on-scroll` uses 0.74; kept subtler
   * here since this wraps photography/UI mockups, not full-bleed video). */
  fromScale?: number;
  children?: ReactNode;
}

/**
 * Scale-in-on-scroll (bexon's `.zoom-on-scroll`) — the wrapped element starts
 * slightly smaller and grows to its natural size as it crosses into view.
 * Framer Motion equivalent of the GSAP `scrollTrigger` version: `useScroll`
 * with an `['start end', 'start center']` offset instead of a `pin`, so
 * there's no DOM mutation before hydration and no pin-spacer to manage.
 *
 * `prefers-reduced-motion`: renders the child at its natural scale with no
 * transform applied — `useTransform` still runs (hooks can't be
 * conditional) but its output is simply never attached to the element.
 */
export default function MotionZoomOnScroll({
  className,
  fromScale = 0.88,
  children,
}: MotionZoomOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start center'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [fromScale, 1]);

  return (
    <div ref={ref} className={className}>
      {/* w-full h-full so the wrapper doesn't break a parent that sizes
       * through its child (e.g. an image tile with height:100% on both the
       * container and the <img>) — the extra div in the chain still needs to
       * pass that 100% through rather than collapsing to auto/content size. */}
      <motion.div className="w-full h-full" style={shouldReduceMotion ? undefined : { scale }}>
        {children}
      </motion.div>
    </div>
  );
}
