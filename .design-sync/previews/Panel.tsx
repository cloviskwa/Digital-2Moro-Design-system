import { Panel, Cta } from '@digital2moro/ui';

export const Translucent = () => (
  <Panel>
    <p className="d2m-body">Translucent panel (default)</p>
  </Panel>
);

export const Solid = () => (
  <Panel solid>
    <p className="d2m-body">Solid panel</p>
  </Panel>
);

export const WithContent = () => (
  <Panel>
    <p className="d2m-eyebrow">Light preview</p>
    <h3>Same components, light tokens</h3>
    <p className="d2m-body">Surfaces, text, and borders all resolve from the same semantic tokens.</p>
    <Cta variant="primary" href="#">
      Primary Cta
    </Cta>
  </Panel>
);
