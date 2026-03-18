import { EmptyState } from './EmptyState';
import { Button } from './Button';

export default {
  title: 'Data Display/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    icon: '📭',
    title: 'No campaigns yet',
    description: 'Create your first outreach campaign to start connecting with Amazon products.',
  },
};

export const WithAction = {
  args: {
    icon: '🔍',
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you\'re looking for.',
    action: <Button variant="primary" label="Clear filters" />,
  },
};

export const Minimal = {
  args: {
    title: 'Nothing here',
  },
};
