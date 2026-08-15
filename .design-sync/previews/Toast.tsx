import { Toast } from '@digital2moro/ui';

export const Success = () => (
  <Toast variant="success" title="Saved" onDismiss={() => {}}>
    Your changes were saved.
  </Toast>
);
