'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE_SMOOTH } from '@/lib/motion';
import MotionNumber from './MotionNumber';

/**
 * Hydration-safe replacement for the GSAP `progressBar` script
 * (`src/libs/progressBar.js`), which drove `.tj-progress-bar`'s width via
 * `gsap.to(...)` and rewrote `.tj-progress-percent`'s text in an `onUpdate`
 * callback — both DOM mutations that happen outside React, which is what
 * required the `suppressHydrationWarning` band-aid on both elements.
 *
 * Same visual result (a filling track + a counting percentage), driven
 * through React/Framer Motion instead: the bar's `width` is a real animated
 * style prop and the percentage is `MotionNumber` (already hydration-safe —
 * starts at 0, counts up via React state once in view). No DOM mutation
 * outside React means no `suppressHydrationWarning` is needed anywhere here.
 *
 * Renders the `<li>` itself — reuses the exact `.tj-progress-list` /
 * `.tj-progress` / `.tj-progress-bar` / `.tj-progress-percent` /
 * `.tj-progress-title` classes and CSS (d2m-public-tokens.css, already
 * transcribed from the live site), so this is a drop-in swap for the old
 * `<li><h6 className="tj-progress-title">…</h6><div className="tj-progress">…</div></li>`
 * markup — just replace the `<li>` with `<MotionProgressBar title=… percent=… />`.
 */
export interface MotionProgressBarProps {
  title: string;
  percent: number;
}

export default function MotionProgressBar({ title, percent }: MotionProgressBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(trackRef, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 0 : 1.2;
  const animateWidth = isInView || shouldReduceMotion;

  return (
    <li>
      <h4 className="tj-progress-title">{title}</h4>
      <div className="tj-progress" ref={trackRef}>
        <MotionNumber
          value={percent}
          suffix="%"
          duration={duration}
          className="tj-progress-percent"
        />
        <motion.div
          className="tj-progress-bar"
          initial={{ width: 0 }}
          animate={{ width: animateWidth ? `${percent}%` : 0 }}
          transition={{ duration, ease: EASE_SMOOTH }}
        />
      </div>
    </li>
  );
}
