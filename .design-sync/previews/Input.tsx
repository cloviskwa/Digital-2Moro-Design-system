import { Input, FormField } from '@digital2moro/ui';

export const Default = () => (
  <FormField label="Name" helperText="Your full name">
    <Input placeholder="Ada Lovelace" />
  </FormField>
);

export const Invalid = () => (
  <FormField label="Email" required errorText="Enter a valid email address">
    <Input type="email" placeholder="ada@example.com" />
  </FormField>
);

export const Disabled = () => (
  <FormField label="Disabled field">
    <Input placeholder="Not editable" disabled />
  </FormField>
);
