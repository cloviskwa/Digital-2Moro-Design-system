import { Dialog } from '@digital2moro/ui';

export const Open = () => (
  <Dialog open onClose={() => {}} title="Example dialog">
    <p className="d2m-body">
      The Dialog shell — no focus trap, no portal, closes on Escape or backdrop click.
    </p>
  </Dialog>
);
