import { Select, FormField } from '@digital2moro/ui';

export const Default = () => (
  <FormField label="Service" errorText="Choose a service">
    <Select defaultValue="">
      <option value="" disabled>
        Select a service
      </option>
      <option value="web">Web development</option>
      <option value="seo">SEO</option>
    </Select>
  </FormField>
);
