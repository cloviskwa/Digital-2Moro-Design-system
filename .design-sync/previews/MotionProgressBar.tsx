import { MotionProgressBar } from '@digital2moro/ui';

export const Default = () => (
  <ul className="tj-progress-list" style={{ padding: 24, listStyle: 'none', margin: 0, width: 320 }}>
    <MotionProgressBar title="Design" percent={92} />
    <MotionProgressBar title="Development" percent={78} />
  </ul>
);
