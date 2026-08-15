import { Textarea, FormField } from '@digital2moro/ui';

export const Default = () => (
  <FormField label="Message" errorText="Message can't be empty">
    <Textarea placeholder="Tell us about your project" />
  </FormField>
);
