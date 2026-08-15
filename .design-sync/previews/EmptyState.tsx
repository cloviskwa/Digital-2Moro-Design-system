import { EmptyState, Button, Panel } from '@digital2moro/ui';

export const Default = () => (
  <Panel>
    <EmptyState
      icon="pages"
      title="No pages yet"
      description="Pages created in the dashboard will appear here."
      action={<Button variant="primary">Create a page</Button>}
    />
  </Panel>
);
