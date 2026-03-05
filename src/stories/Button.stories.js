import { fn } from 'storybook/test';
import { Button } from './Button';

export default {
  title: 'Forms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
};

export const Primary = {
  args: {
    variant: 'primary',
    label: 'Button',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    label: 'Button',
  },
};

export const Outline = {
  args: {
    variant: 'outline',
    label: 'Button',
  },
};

export const Ghost = {
  args: {
    variant: 'ghost',
    label: 'Button',
  },
};

export const Danger = {
  args: {
    variant: 'danger',
    label: 'Button',
  },
};

export const Small = {
  args: {
    variant: 'primary',
    size: 'small',
    label: 'Small',
  },
};

export const Large = {
  args: {
    variant: 'primary',
    size: 'large',
    label: 'Large',
  },
};

export const Disabled = {
  args: {
    variant: 'primary',
    label: 'Disabled',
    disabled: true,
  },
};
