'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export interface MotionTextInvertProps {
  className?: string;
  /** Tag for the outer wrapper. Default `span` (inline use inside a heading);
   * pass `"div"`/`"h2"` etc. for a standalone block. */
  as?: 'span' | 'div' | 'h2' | 'h3';
  children?: ReactNode;
  activeColor?: string;
}

/**
 * Scroll-scrubbed color reveal (bexon's `.tj-text-invert`) — a dim copy of
 * the text sits underneath a blue copy that reveals left-to-right as the
 * element crosses the viewport, tied directly to scroll position (not a
 * one-shot entrance). Two full copies of the same text stacked via
 * `position: absolute`, clipped with `clip-path: inset()` driven by
 * `useTransform` — deliberately NOT a char-split (that's `MotionTitle`'s
 * job for the reveal-on-scroll case); this is a color effect on already-
 * visible text, meant for a single short pull-quote/headline, not paired
 * with `MotionTitle` on the same text.
 *
 * The overlay copy is `aria-hidden` since the base copy already carries the
 * real, readable text — screen readers see it once.
 *
 * `prefers-reduced-motion`: renders only the plain (base-color) text, no
 * overlay, no scroll listener attached.
 */
function WordSpan({
  word,
  range,
  progress,
  activeColor,
}: {
  word: string;
  range: [number, number];
  progress: any;
  activeColor: string;
}) {
  const opacity = useTransform(progress, range, [0.35, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block mr-[0.26em] ${activeColor}`}>
      {word}
    </motion.span>
  );
}

export default function MotionTextInvert({ className, as = 'span', children, activeColor = 'text-white' }: MotionTextInvertProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.88', 'center 0.35'],
  });

  const Tag = as as 'span';

  if (typeof children === 'string') {
    const words = children.split(' ');
    return (
      <Tag ref={ref} className={`relative inline ${className ?? ''}`}>
        {!shouldReduceMotion
          ? words.map((word, i) => {
              const start = (i / words.length) * 0.8;
              const end = Math.min(1, start + 0.25);
              return (
                <WordSpan
                  key={i}
                  word={word}
                  range={[start, end]}
                  progress={scrollYProgress}
                  activeColor={activeColor}
                />
              );
            })
          : children}
      </Tag>
    );
  }

  const clipPath = useTransform(scrollYProgress, (v) => `inset(0 ${100 - Math.max(0, Math.min(1, v)) * 100}% 0 0)`);

  return (
    <Tag ref={ref} className={`relative inline-block ${className ?? ''}`}>
      <span className="opacity-40">{children}</span>
      {!shouldReduceMotion ? (
        <motion.span
          aria-hidden="true"
          className={`absolute inset-0 ${activeColor} overflow-hidden`}
          style={{ clipPath }}
        >
          {children}
        </motion.span>
      ) : null}
    </Tag>
  );
}
