'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { defaultViewport, staggerChild, staggerContainer } from '@/lib/motion';

export interface MotionStaggerProps
  extends Omit<
    HTMLMotionProps<'div'>,
    'variants' | 'initial' | 'animate' | 'whileInView' | 'viewport' | 'children'
  > {
  /** Seconds between each child's reveal. Default `0.08`. */
  staggerDelay?: number;
  children?: ReactNode;
}

/**
 * Stagger container (Phase 14E) — reveals its `MotionStaggerItem` children
 * in sequence once scrolled into view, instead of all at once. Pair with
 * `MotionStaggerItem`, not arbitrary children — a stagger needs each child to
 * carry its own `hidden`/`visible` variant to participate in the timing.
 *
 * Same `prefers-reduced-motion` handling as `MotionReveal`: renders a plain
 * `<div>` when reduced motion is preferred, so every child (also
 * reduced-motion-aware — see `MotionStaggerItem`) renders fully visible
 * immediately, with no stagger delay at all.
 */
export function MotionStagger({ staggerDelay = 0.08, className, children, ...rest }: MotionStaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer(staggerDelay)}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Tags actually needed across the site's `wow`-class call sites — kept in
 * sync with `MotionRevealTag` (same reasoning: `motion[as]` indexing needs a
 * known literal union, not the full `JSX.IntrinsicElements`). */
export type MotionStaggerTag =
  | 'div' | 'section' | 'span' | 'li' | 'ul' | 'p'
  | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'a';

export type MotionStaggerItemProps = Omit<
  HTMLMotionProps<'div'>,
  'variants' | 'initial' | 'animate' | 'children'
> & {
  /** Tag to render. Default `div` — see `MotionRevealProps.as` for why this
   * matters on grid/flex children. */
  as?: MotionStaggerTag;
  children?: ReactNode;
};

/**
 * One item inside a `MotionStagger`. Checks `useReducedMotion()`
 * independently of its parent (rather than relying on framer-motion's
 * variant-propagation falling through correctly) so it's unambiguous and
 * self-contained: reduced motion always means "just render the children,"
 * full stop, regardless of what the parent happens to do.
 */
export function MotionStaggerItem({ as = 'div', className, children, ...rest }: MotionStaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const Tag = as;

  if (shouldReduceMotion) {
    const PlainTag = as;
    return <PlainTag className={className}>{children}</PlainTag>;
  }

  // Same narrowing as MotionReveal: props are constrained to
  // `HTMLMotionProps<'div'>`, so collapse the polymorphic `motion[Tag]` union
  // back to that shape rather than the un-spreadable per-tag union.
  const MotionTag = motion[Tag] as typeof motion.div;

  return (
    <MotionTag className={className} variants={staggerChild} {...rest}>
      {children}
    </MotionTag>
  );
}
