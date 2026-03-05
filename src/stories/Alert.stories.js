import { fn } from 'storybook/test';
import { Alert } from './Alert';

export default {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
};

export const Success = {
  args: {
    title: 'Success',
    message: 'Your changes have been saved.',
    variant: 'success',
  },
};

export const Warning = {
  args: {
    title: 'Warning',
    message: 'Your session is about to expire.',
    variant: 'warning',
  },
};

export const Error = {
  args: {
    title: 'Error',
    message: 'Something went wrong. Please try again.',
    variant: 'error',
  },
};

export const Info = {
  args: {
    title: 'Info',
    message: 'A new version is available.',
    variant: 'info',
  },
};

export const Dismissible = {
  args: {
    title: 'Heads up',
    message: 'Click the X to dismiss this alert.',
    variant: 'info',
    onClose: fn(),
  },
};
