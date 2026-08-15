import { Radio } from '@digital2moro/ui';

export const Group = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Radio id="radio-1" name="radio-group" label="Option A" defaultChecked />
    <Radio id="radio-2" name="radio-group" label="Option B" />
    <Radio id="radio-3" name="radio-group" label="Disabled" disabled />
  </div>
);
