import { MotionNumber } from '@/components/motion';

export interface StatPillProps {
  /** Final value to count up to. */
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

/**
 * Small stat pill (Phase 16B) — a bordered pill showing a count-up number
 * plus a label. A direct `MotionNumber` consumer (Phase 14E): the count-up
 * itself, its reduced-motion handling, and its viewport-triggered start are
 * all `MotionNumber`'s job, not reimplemented here.
 */
export default function StatPill({ value, label, prefix, suffix, decimals, className }: StatPillProps) {
  const classes = ['d2m-stat-pill', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <p className="d2m-stat-pill__value">
        <MotionNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </p>
      <p className="d2m-stat-pill__label">{label}</p>
    </div>
  );
}
