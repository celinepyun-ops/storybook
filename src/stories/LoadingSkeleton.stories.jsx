import { LoadingSkeleton } from './LoadingSkeleton';

export default {
  title: 'Data Display/LoadingSkeleton',
  component: LoadingSkeleton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Text = {
  args: { variant: 'text' },
};

export const MultipleLines = {
  args: { variant: 'text', lines: 4 },
};

export const Circle = {
  args: { variant: 'circle', width: '48px', height: '48px' },
};

export const Rectangle = {
  args: { variant: 'rectangle', width: '100%', height: '200px' },
};

export const Card = {
  args: { variant: 'card', width: '100%', height: '160px' },
};
