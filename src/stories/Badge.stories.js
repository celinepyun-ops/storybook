import { Badge } from './Badge';

export default {
  title: 'Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const Success = {
  args: { label: 'Success', variant: 'success' },
};

export const Warning = {
  args: { label: 'Warning', variant: 'warning' },
};

export const Error = {
  args: { label: 'Error', variant: 'error' },
};

export const Info = {
  args: { label: 'Info', variant: 'info' },
};

export const Small = {
  args: { label: 'Small', variant: 'info', size: 'small' },
};

export const Large = {
  args: { label: 'Large', variant: 'success', size: 'large' },
};
