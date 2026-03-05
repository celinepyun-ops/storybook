import { fn } from 'storybook/test';
import { Input } from './Input';

export default {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    onChange: fn(),
  },
};

export const WithHelper = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters.',
    onChange: fn(),
  },
};

export const ErrorState = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helperText: 'Please enter a valid email address.',
    error: true,
    onChange: fn(),
  },
};

export const Disabled = {
  args: {
    label: 'Username',
    placeholder: 'Not editable',
    disabled: true,
  },
};
