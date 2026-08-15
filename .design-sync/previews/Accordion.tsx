import { Accordion } from '@digital2moro/ui';

export const Default = () => (
  <Accordion
    items={[
      {
        value: 'a',
        title: 'What is this component?',
        content: <p className="d2m-body">A collapsible list of items, one open at a time.</p>,
        defaultOpen: true,
      },
      {
        value: 'b',
        title: 'Is it accessible?',
        content: <p className="d2m-body">Yes — keyboard navigable, proper ARIA attributes.</p>,
      },
      {
        value: 'c',
        title: 'Can items be nested?',
        content: <p className="d2m-body">No — each item renders flat content only.</p>,
      },
    ]}
  />
);
