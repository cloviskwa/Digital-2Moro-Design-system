'use client';

import { Children, Fragment, isValidElement, cloneElement, type ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { EASE_SMOOTH, defaultViewport } from '@/lib/motion';

/**
 * Char-level title reveal — the React-native, hydration-safe replacement for
 * the old GSAP `SplitText` title animation (`src/libs/titleAnim.js`). That lib
 * rewrote every `.title-anim` heading's DOM (split chars into spans, added
 * `start-anim` + `aria-label` + inline styles) AFTER the server HTML was sent
 * but before/around React hydration, which is exactly what triggered the
 * recurring "server rendered HTML didn't match the client" errors.
 *
 * This does the same visual effect (each character rises up + fades in, with a
 * fast stagger, once the heading scrolls into view) but the splitting happens
 * at RENDER time — deterministic, identical on server and client — so React
 * hydrates the exact tree it rendered. framer-motion drives the animation
 * through React's own lifecycle rather than mutating the DOM behind its back.
 *
 * Mixed content is preserved: text nodes are split into per-char motion spans,
 * while nested elements (e.g. `<span className="text-d2m-blue">…</span>`) are
 * cloned with their props/classes intact and their text recursively split.
 * Word wrapping is kept by wrapping each word in an `inline-block` span so a
 * word never breaks mid-character, with normal breakable whitespace between
 * words.
 *
 * Accessibility: the animated split is marked `aria-hidden`, and a
 * visually-hidden copy of the ORIGINAL children carries the readable text, so
 * a screen reader reads the heading once as normal text — never character by
 * character. We deliberately do NOT compute an `aria-label` string from the
 * children: flattening mixed children to a string differs subtly across the
 * server/client (RSC) boundary and produced a hydration mismatch on the label
 * attribute. The visually-hidden copy renders `children` verbatim (exactly as
 * React renders them anywhere else), so it can never mismatch.
 *
 * `prefers-reduced-motion`: renders the heading with its original children,
 * fully visible from first paint, no splitting and no animation.
 */

/** Standard visually-hidden style — kept inline so the component never depends
 * on a particular `.sr-only`/utility class existing in whatever CSS is loaded. */
const srOnly: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export type MotionTitleTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export interface MotionTitleProps {
  /** Heading tag to render. Default `h2`. */
  as?: MotionTitleTag;
  className?: string;
  children?: ReactNode;
  /** Seconds between each character. Default `0.006` (snappy). */
  stagger?: number;
  /** Delay (seconds) before the first character starts. Default `0`. */
  delay?: number;
}

const charVariants: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { duration: 0.4, ease: EASE_SMOOTH } },
};

/* Inline-block is required to animate `y` on a character, but inline-block
 * pieces are baseline-aligned and would inflate a multi-line heading's line
 * box. `vertical-align: top` + `line-height: 1` pins each glyph box to its own
 * height so the heading's own line-height governs line spacing — measured to
 * match plain (unsplit) heading text exactly (no inflation). `overflow` is left
 * visible (no mask) to mirror the original GSAP rise. */
const inlineBlock: React.CSSProperties = {
  display: 'inline-block',
  verticalAlign: 'top',
  lineHeight: 1,
};

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Split a run of text into wrap-safe, per-character motion spans. */
function splitText(text: string, keyPrefix: string): ReactNode[] {
  // Keep whitespace chunks as separate segments so words stay breakable at
  // spaces but never mid-character.
  const segments = text.split(/(\s+)/);
  return segments.map((segment, segmentIndex) => {
    if (segment === '') return null;
    if (/^\s+$/.test(segment)) {
      // Preserve the original whitespace as a normal, breakable text node.
      return <Fragment key={`${keyPrefix}-ws-${segmentIndex}`}>{segment}</Fragment>;
    }
    return (
      <span
        key={`${keyPrefix}-w-${segmentIndex}`}
        style={{ ...inlineBlock, whiteSpace: 'nowrap' }}
      >
        {Array.from(segment).map((char, charIndex) => (
          <motion.span
            key={`${keyPrefix}-w-${segmentIndex}-c-${charIndex}`}
            style={inlineBlock}
            variants={charVariants}
          >
            {char}
          </motion.span>
        ))}
      </span>
    );
  });
}

/** Recursively render children, splitting text nodes and preserving elements. */
function renderSplit(node: ReactNode, keyPrefix: string): ReactNode {
  if (node === null || node === undefined || typeof node === 'boolean') return null;
  if (typeof node === 'string' || typeof node === 'number') {
    return splitText(String(node), keyPrefix);
  }
  if (Array.isArray(node)) {
    return Children.map(node, (child, index) => renderSplit(child, `${keyPrefix}-${index}`));
  }
  if (isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: ReactNode }>;
    return cloneElement(
      element,
      { key: keyPrefix },
      renderSplit(element.props.children, `${keyPrefix}-x`)
    );
  }
  return node;
}

export default function MotionTitle({
  as = 'h2',
  className,
  children,
  stagger = 0.006,
  delay = 0,
}: MotionTitleProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      {/* Readable copy for assistive tech — rendered verbatim, never split. */}
      <span style={srOnly}>{children}</span>
      {/* Animated, char-split copy — hidden from assistive tech. */}
      <span aria-hidden="true">{renderSplit(children, 'mt')}</span>
    </MotionTag>
  );
}
