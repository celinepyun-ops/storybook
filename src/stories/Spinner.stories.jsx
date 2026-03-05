import { Spinner } from './Spinner';

export default {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const Small = {
  args: { size: 'sm' },
};

export const Medium = {
  args: { size: 'md' },
};

export const Large = {
  args: { size: 'lg' },
};

export const WithLabel = {
  args: { size: 'md', label: 'Loading...' },
};
