import { ProgressBar } from './ProgressBar';

export default {
  title: 'Feedback/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: { value: 60, max: 100 },
};

export const WithValue = {
  args: { value: 45, max: 100, showValue: true },
};

export const Success = {
  args: { value: 100, max: 100, variant: 'success', showValue: true },
};

export const Warning = {
  args: { value: 75, max: 100, variant: 'warning', showValue: true },
};

export const Error = {
  args: { value: 30, max: 100, variant: 'error', showValue: true },
};

export const Small = {
  args: { value: 50, size: 'sm' },
};

export const Large = {
  args: { value: 70, size: 'lg', showValue: true },
};
