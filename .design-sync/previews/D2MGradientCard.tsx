import { D2MGradientCard } from '@digital2moro/ui';

export const DataSync = () => <D2MGradientCard variant="data-sync" style={{ height: 140 }} />;

export const Reporting = () => (
  <D2MGradientCard variant="reporting" style={{ height: 140, padding: 12 }}>
    <div className="d2m-gradient-inner-panel" style={{ height: '100%' }} />
  </D2MGradientCard>
);

export const Orbit = () => (
  <D2MGradientCard variant="orbit" style={{ height: 140 }}>
    <span className="d2m-orbit-rings" />
  </D2MGradientCard>
);

export const Setup = () => (
  <D2MGradientCard variant="setup" style={{ height: 140, padding: 12 }}>
    <div className="d2m-gradient-dashed-panel" style={{ height: '60%' }} />
  </D2MGradientCard>
);

export const FooterCta = () => <D2MGradientCard variant="footer-cta" style={{ height: 140 }} />;

export const HeroPanel = () => <D2MGradientCard variant="hero-panel" style={{ height: 140 }} />;
