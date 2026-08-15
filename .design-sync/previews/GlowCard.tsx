import { GlowCard } from '@digital2moro/ui';

export const Blue = () => (
  <GlowCard accent="blue" tabIndex={0}>
    <p className="d2m-eyebrow">Blue</p>
    <p className="d2m-body">Default accent — matches the primary CTA blue.</p>
  </GlowCard>
);

export const Cyan = () => (
  <GlowCard accent="cyan" tabIndex={0}>
    <p className="d2m-eyebrow">Cyan</p>
    <p className="d2m-body">A cooler accent for secondary emphasis.</p>
  </GlowCard>
);

export const Violet = () => (
  <GlowCard accent="violet" tabIndex={0}>
    <p className="d2m-eyebrow">Violet</p>
    <p className="d2m-body">A tertiary accent, used sparingly.</p>
  </GlowCard>
);
