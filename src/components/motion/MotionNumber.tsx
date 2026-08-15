'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { EASE_SMOOTH } from '@/lib/motion';

export interface MotionNumberProps {
  /** Final value to count up to. */
  value: number;
  /** Text before the number, e.g. `"$"`. */
  prefix?: string;
  /** Text after the number, e.g. `"+"`, `"%"`. */
  suffix?: string;
  /** Decimal places to keep. Default `0`. */
  decimals?: number;
  /** Count-up duration in seconds. Default `1.2`. */
  duration?: number;
  className?: string;
}

/**
 * Count-up number (Phase 14E, optional per the phase brief — included since
 * it stayed simple and safe). Animates from 0 to `value` once scrolled into
 * view, formatted with `toLocaleString` (thousands separators, fixed
 * decimals). The number itself is always present in the DOM as real text —
 * screen readers see the real value converging, not a placeholder that
 * appears only after animation finishes.
 *
 * `prefers-reduced-motion`: jumps straight to the final value the moment
 * that preference resolves (does not wait for viewport entry) — "render
 * immediately" per the phase brief, not just "skip the count-up once
 * revealed." One accepted, documented limitation: on the very first
 * client render before the reduced-motion effect runs, `0` is briefly the
 * displayed value (same value SSR renders, so no hydration mismatch) —
 * corrected within the same effect pass, before the user has a chance to
 * read it in practice.
 */
export default function MotionNumber({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.2,
  className,
}: MotionNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    // Reduced motion jumps straight to the final value (duration 0) instead
    // of waiting for viewport entry; setDisplay only ever runs inside
    // animate()'s onUpdate callback, never as a direct effect-body call.
    if (!shouldReduceMotion && !isInView) return;

    const controls = animate(0, value, {
      duration: shouldReduceMotion ? 0 : duration,
      ease: EASE_SMOOTH,
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [shouldReduceMotion, isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
