import { Cta } from '@digital2moro/ui';

export const Variants = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
    <Cta variant="primary" href="#">
      Primary Cta
    </Cta>
    <Cta variant="outline" href="#">
      Outline Cta
    </Cta>
  </div>
);

export const Action = () => (
  <Cta variant="action" href="#">
    Get started
  </Cta>
);
