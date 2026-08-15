import { Alert } from '@digital2moro/ui';

export const Info = () => (
  <Alert variant="info" title="Info">
    Informational message.
  </Alert>
);

export const Success = () => (
  <Alert variant="success" title="Success">
    Something worked.
  </Alert>
);

export const Warning = () => (
  <Alert variant="warning" title="Warning">
    Worth a second look.
  </Alert>
);

export const Error = () => (
  <Alert variant="error" title="Error">
    Something needs fixing.
  </Alert>
);
