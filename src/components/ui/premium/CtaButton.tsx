'use client';

import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { DashboardIcon } from '@/components/icons';
import { hoverLift, tapScale } from '@/lib/motion';

/**
 * `framer-motion`'s `motion.a`/`motion.button` redefine `onDrag`/`onDragStart`/
 * `onDragEnd`/`onAnimationStart`/`onAnimationEnd` with gesture-event
 * signatures incompatible with the native DOM event types — the same
 * conflict `MotionReveal`/`MotionStagger` (`src/components/motion/`) already
 * worked around by omitting these from their own prop types.
 */
type MotionConflictingHandlers = 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd';

type CtaButtonAsLink = { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, MotionConflictingHandlers>;
type CtaButtonAsButton = { href?: undefined } & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  MotionConflictingHandlers
>;

export type CtaButtonProps = (CtaButtonAsLink | CtaButtonAsButton) & {
  className?: string;
};

/**
 * Icon-bubble animated CTA (Phase 16B) — distinct from `Cta`'s `action`
 * variant (Phase 16E, pure CSS transitions, brand-invariant white pill/blue
 * bubble): this one is driven by `framer-motion`'s `whileHover`/`whileTap`
 * using the shared `hoverLift`/`tapScale` presets (`src/lib/motion`),
 * demonstrating the motion foundation applied to a real interactive
 * control — not a duplicate of 16E's component, a parallel one. Solid blue
 * pill / white label / white circular bubble with a blue arrow — the
 * inverse color scheme from the CSS `action` variant, so the two read as a
 * distinct, complementary pair rather than the same button twice.
 *
 * `prefers-reduced-motion`: renders a plain `<a>`/`<button>` (no
 * `motion.*` element at all) when reduced motion is preferred.
 */
export default function CtaButton({ className, children, ...rest }: CtaButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const classes = ['d2m-cta-button', className].filter(Boolean).join(' ');

  const content = (
    <>
      <span className="d2m-cta-button__label">{children}</span>
      <span className="d2m-cta-button__bubble" aria-hidden="true">
        <DashboardIcon name="arrowRight" variant="plain" size="sm" />
      </span>
    </>
  );

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as CtaButtonAsLink;
    if (shouldReduceMotion) {
      return (
        <a href={href} className={classes} {...anchorRest}>
          {content}
        </a>
      );
    }
    return (
      <motion.a href={href} className={classes} whileHover={hoverLift} whileTap={tapScale} {...anchorRest}>
        {content}
      </motion.a>
    );
  }

  const { type = 'button', ...buttonRest } = rest as CtaButtonAsButton;
  if (shouldReduceMotion) {
    return (
      <button type={type} className={classes} {...buttonRest}>
        {content}
      </button>
    );
  }
  return (
    <motion.button
      type={type}
      className={classes}
      whileHover={hoverLift}
      whileTap={tapScale}
      {...buttonRest}
    >
      {content}
    </motion.button>
  );
}
