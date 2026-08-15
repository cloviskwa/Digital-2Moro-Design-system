import { Checkbox } from '@digital2moro/ui';

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Checkbox id="cb-1" label="Unchecked" />
    <Checkbox id="cb-2" label="Checked" defaultChecked />
    <Checkbox id="cb-3" label="Disabled" disabled />
  </div>
);
