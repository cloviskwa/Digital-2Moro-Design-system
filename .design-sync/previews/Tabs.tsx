import { Tabs } from '@digital2moro/ui';

export const Default = () => (
  <Tabs
    defaultValue="overview"
    items={[
      { value: 'overview', label: 'Overview', content: <p className="d2m-body">Overview panel content.</p> },
      { value: 'details', label: 'Details', content: <p className="d2m-body">Details panel content.</p> },
      {
        value: 'disabled',
        label: 'Disabled',
        content: <p className="d2m-body">Not reachable.</p>,
        disabled: true,
      },
    ]}
  />
);
