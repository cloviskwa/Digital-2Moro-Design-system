import { Switch } from '@digital2moro/ui';

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Switch id="switch-1" label="Off" />
    <Switch id="switch-2" label="On" defaultChecked />
    <Switch id="switch-3" label="Disabled" disabled />
  </div>
);
