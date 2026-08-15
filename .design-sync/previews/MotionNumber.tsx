import { MotionNumber } from '@digital2moro/ui';

export const CountUp = () => (
  <div style={{ padding: 24 }}>
    <p className="d2m-display" style={{ margin: 0, fontSize: '3rem', fontWeight: 700 }}>
      <MotionNumber value={10482} suffix="+" />
    </p>
    <p className="d2m-caption">Projects shipped (mock figure)</p>
  </div>
);

export const Percentage = () => (
  <div style={{ padding: 24 }}>
    <p className="d2m-display" style={{ margin: 0, fontSize: '3rem', fontWeight: 700 }}>
      <MotionNumber value={99.98} suffix="%" decimals={2} />
    </p>
    <p className="d2m-caption">Uptime (mock figure)</p>
  </div>
);
