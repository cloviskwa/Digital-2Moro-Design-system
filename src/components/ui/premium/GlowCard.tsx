'use client';

import type { HTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { hoverLift } from '@/lib/motion';

export type GlowCardAccent = 'blue' | 'cyan' | 'violet';

/**
 * `framer-motion`'s `motion.div` redefines `onDrag`/`onDragStart`/`onDragEnd`/
 * `onAnimationStart`/`onAnimationEnd` with gesture-event signatures
 * incompatible with the native DOM event types — the same conflict
 * `CtaButton` (`src/components/ui/premium/CtaButton.tsx`) already works
 * around the same way.
 */
type MotionConflictingHandlers = 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd';

export interface GlowCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | MotionConflictingHandlers> {
  /** Which glow token to use. Default `blue`. */
  accent?: GlowCardAccent;
  className?: string;
}

/**
 * Glow-accented card (Phase 16B) — a bordered panel with a soft radial glow
 * that fades in on hover/focus, using the `--d2m-glow-blue/cyan/violet`
 * tokens (defined since Phase 14A, `cyan`/`violet` unused until now —
 * `--d2m-glow-blue` got its first real use in Phase 16E's
 * `TechnicalDetailCard`). The glow reveal itself is plain CSS (a simple
 * opacity fade on `:hover`/`:focus-within`, not a motion-library concern);
 * `framer-motion` drives the small hover lift via the shared `hoverLift`
 * preset (`src/lib/motion`), so this is a real 14E consumer, not just a
 * glow effect with no motion foundation involved.
 *
 * `prefers-reduced-motion`: renders a plain `<div>` (no lift) when reduced
 * motion is preferred — the CSS glow fade still works either way, since a
 * simple opacity change on hover isn't the kind of movement reduced-motion
 * guards against.
 */
export default function GlowCard({ accent = 'blue', children, className, ...rest }: GlowCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const classes = ['d2m-glow-card', `d2m-glow-card--${accent}`, className].filter(Boolean).join(' ');

  if (shouldReduceMotion) {
    return (
      <div className={classes} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div className={classes} whileHover={hoverLift} {...rest}>
      {children}
    </motion.div>
  );
}
