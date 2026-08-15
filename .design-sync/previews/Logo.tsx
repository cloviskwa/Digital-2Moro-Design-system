import { Logo } from '@digital2moro/ui';

export const StackedDark = () => (
  <div style={{ background: '#000', padding: 24, borderRadius: 12 }}>
    <Logo variant="stacked" theme="dark" style={{ height: 56 }} />
  </div>
);

export const StackedLight = () => (
  <div style={{ background: '#fff', padding: 24, borderRadius: 12 }}>
    <Logo variant="stacked" theme="light" style={{ height: 56 }} />
  </div>
);

export const InlineDark = () => (
  <div style={{ background: '#000', padding: 24, borderRadius: 12 }}>
    <Logo variant="inline" theme="dark" style={{ height: 32 }} />
  </div>
);

export const InlineLight = () => (
  <div style={{ background: '#fff', padding: 24, borderRadius: 12 }}>
    <Logo variant="inline" theme="light" style={{ height: 32 }} />
  </div>
);
