import { Card } from '@digital2moro/ui';

export const Static = () => (
  <Card>
    <p className="d2m-card__title">Static card</p>
    <p className="d2m-card__description">No hover/focus treatment.</p>
  </Card>
);

export const Interactive = () => (
  <Card interactive>
    <p className="d2m-card__title">Interactive card</p>
    <p className="d2m-card__description">
      Hover or Tab to it — lifts and lightens, with a visible focus ring.
    </p>
  </Card>
);
