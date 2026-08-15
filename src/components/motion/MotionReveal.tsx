'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { baseTransition, defaultViewport, fadeIn, fadeLeft, fadeRight, fadeUp, scaleIn, swipeInLeft, swipeInRight, swipeInUp } from '@/lib/motion';

export type MotionRevealVariant = 'fade' | 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'swipe-left' | 'swipe-right' | 'swipe-up';

/** Tags actually needed across the site's `wow`-class call sites. Add one
 * here (not `keyof JSX.IntrinsicElements`, to keep `motion[as]` indexing
 * type-safe) if a new tag comes up. */
export type MotionRevealTag =
  | 'div' | 'section' | 'span' | 'li' | 'ul' | 'p'
  | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'a';

const VARIANT_MAP = {
  fade: fadeIn,
  'fade-up': fadeUp,
  'fade-left': fadeLeft,
  'fade-right': fadeRight,
  scale: scaleIn,
  'swipe-left': swipeInLeft,
  'swipe-right': swipeInRight,
  'swipe-up': swipeInUp,
} as const;

/** The swipe variants animate `rotateY`/`rotateX`, which need a `perspective`
 * on the element (or an ancestor) to read as 3D instead of a flat squish. */
const PERSPECTIVE_STYLE = { perspective: 1200 } as const;

export interface MotionRevealProps
  extends Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'animate' | 'whileInView' | 'viewport' | 'children'> {
  /** Which reveal motion to use. Default `fade-up`. */
  variant?: MotionRevealVariant;
  /** Extra delay (seconds) before this element's own reveal starts. */
  delay?: number;
  /**
   * Tag to render. Default `div`. Set this to whatever tag the wrapped
   * content actually needs (`section`, `span`, `li`, `ul`, ...) — critical
   * when replacing a `wow` class on a grid/flex CHILD (e.g.
   * `className="lg:col-span-4 wow fadeInUp"`): rendering a `div` there is
   * fine since the original was already a div, but forcing a `div` when the
   * original was e.g. an `li` would break list semantics, and wrapping an
   * existing grid child in an *extra* nested div (rather than replacing its
   * own tag) would break the grid/flex column span itself.
   */
  as?: MotionRevealTag;
  children?: ReactNode;
}

/**
 * Reveal-on-scroll wrapper (Phase 14E) — fades an element in, optionally
 * with a small upward slide or scale, once it enters the viewport. Opt-in
 * only: wrap the specific content that should reveal, nothing animates
 * automatically just by existing in the tree.
 *
 * `prefers-reduced-motion`: `useReducedMotion()` renders `null` during SSR
 * and the client's first (hydrating) render — identical on both, so there's
 * no hydration mismatch risk — then resolves to a real boolean after mount.
 * When it resolves `true`, this renders a plain `<div>` instead of a
 * `motion.div`: content is present and fully visible from the first paint,
 * never gated behind an animation, and never hidden from screen readers
 * (the `hidden` variant only ever sets `opacity`/`transform`, never
 * `display`/`visibility`/`aria-hidden`, so even the animated path never
 * removes content from the accessibility tree — it just starts translucent).
 */
export default function MotionReveal({
  as = 'div',
  variant = 'fade-up',
  delay = 0,
  className,
  style,
  children,
  ...rest
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const Tag = as;
  const isSwipe = variant === 'swipe-left' || variant === 'swipe-right' || variant === 'swipe-up';

  if (shouldReduceMotion) {
    const PlainTag = as;
    // Forward the remaining props (href, aria-label, target, rel, id, …) —
    // without this, a reduced-motion `as="a"` render drops its href and the
    // link stops working. `rest` is typed for motion elements; the motion-only
    // handler types don't matter for the plain intrinsic tag.
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- forward motion-typed rest to a plain intrinsic tag without re-deriving per-tag prop types
      <PlainTag className={className} style={style} {...(rest as any)}>
        {children}
      </PlainTag>
    );
  }

  // Props are constrained to `HTMLMotionProps<'div'>` by MotionRevealProps, so
  // narrow the polymorphic `motion[Tag]` union back to that same shape — the
  // per-tag event-handler element types (HTMLAnchorElement vs HTMLDivElement)
  // are otherwise mutually incompatible and the union can't be spread into.
  const MotionTag = motion[Tag] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      style={isSwipe ? { ...PERSPECTIVE_STYLE, ...style } : style}
      variants={VARIANT_MAP[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      transition={delay ? { ...baseTransition, delay } : undefined}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
