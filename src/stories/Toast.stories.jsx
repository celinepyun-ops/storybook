import { fn } from 'storybook/test';
import { Toast } from './Toast';

export default {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
};

export const Success = {
  args: {
    message: 'Changes saved successfully.',
    variant: 'success',
    onClose: fn(),
  },
};

export const Warning = {
  args: {
    message: 'Your session will expire in 5 minutes.',
    variant: 'warning',
    onClose: fn(),
  },
};

export const Error = {
  args: {
    message: 'Failed to save changes. Please try again.',
    variant: 'error',
    onClose: fn(),
  },
};

export const Info = {
  args: {
    message: 'A new update is available.',
    variant: 'info',
    onClose: fn(),
  },
};

export const WithAction = {
  args: {
    message: 'Item moved to trash.',
    variant: 'info',
    action: 'Undo',
    onAction: fn(),
    onClose: fn(),
  },
};
