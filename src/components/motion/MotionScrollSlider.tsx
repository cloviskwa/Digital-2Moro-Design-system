'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

/**
 * Pinned horizontal scroll section — the Framer Motion replacement for the
 * GSAP `tjScrollSlider` (ScrollTrigger `pin: true` + `xPercent` tween).
 *
 * How the geometry works: the outer section is made taller than the viewport
 * by exactly the track's horizontal overflow, and the inner wrapper is
 * `sticky top-0 h-screen`. That pins the wrapper for precisely `distance` px
 * of vertical scrolling, and `useScroll`'s `['start start', 'end end']` range
 * over that same section spans the same `distance` — so vertical scroll maps
 * 1:1 onto horizontal travel, which is what the GSAP `scrub` did.
 *
 * The overflow is MEASURED rather than gated on a media query. Below the
 * breakpoint the track's own CSS flips to `flex-direction: column`, so there
 * is no horizontal overflow, `distance` stays 0, and the whole effect
 * disables itself — no `matchMedia` and no hydration-sensitive branch on
 * viewport width. `distance` is 0 during SSR and the first client render
 * (identical on both, so no mismatch), then resolves after measurement.
 */

interface ScrollSliderContextValue {
  setTrackEl: (node: HTMLDivElement | null) => void;
  x: MotionValue<number>;
  active: boolean;
}

const ScrollSliderContext = createContext<ScrollSliderContextValue | null>(null);

export interface MotionScrollSliderProps {
  className?: string;
  children?: ReactNode;
}

export function MotionScrollSlider({ className, children }: MotionScrollSliderProps) {
  const [sectionEl, setSectionEl] = useState<HTMLDivElement | null>(null);
  const [trackEl, setTrackEl] = useState<HTMLDivElement | null>(null);
  const [distance, setDistance] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!trackEl) return;
    const measure = () => {
      const overflow = trackEl.scrollWidth - trackEl.clientWidth;
      setDistance(overflow > 0 ? overflow : 0);
    };
    measure();
    // Re-measure on track resize (viewport changes, font swap, image load) so
    // the section height and travel distance stay in sync with reality.
    const observer = new ResizeObserver(measure);
    observer.observe(trackEl);
    return () => observer.disconnect();
  }, [trackEl]);

  const active = distance > 0 && !shouldReduceMotion;

  // `useScroll` needs a RefObject; a state-backed callback ref gives the same
  // thing while also re-rendering once the node lands, which the measurement
  // effect above depends on.
  const { scrollYProgress } = useScroll({
    target: { current: sectionEl },
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <ScrollSliderContext.Provider value={{ setTrackEl, x, active }}>
      <div
        ref={setSectionEl}
        className={className}
        style={active ? { height: `calc(100vh + ${distance}px)` } : undefined}
      >
        <div
          className={
            active
              ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden'
              : undefined
          }
        >
          {children}
        </div>
      </div>
    </ScrollSliderContext.Provider>
  );
}

export interface MotionScrollTrackProps {
  className?: string;
  children?: ReactNode;
}

/**
 * The horizontally-travelling strip inside a `MotionScrollSlider`. Keep the
 * caller's existing flex/nowrap classes on this — the measurement above reads
 * this element's own `scrollWidth`/`clientWidth`.
 */
export function MotionScrollTrack({ className, children }: MotionScrollTrackProps) {
  const ctx = useContext(ScrollSliderContext);
  // Hooks can't be conditional, so keep a local fallback for the (unsupported)
  // case of a track rendered outside a slider — it just never moves.
  const fallbackX = useMotionValue(0);

  return (
    <motion.div
      ref={ctx?.setTrackEl}
      className={className}
      style={{ x: ctx?.active ? ctx.x : fallbackX }}
    >
      {children}
    </motion.div>
  );
}

export default MotionScrollSlider;
