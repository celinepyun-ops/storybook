import { fn } from 'storybook/test';
import { HelpButton } from './HelpButton';

export default {
  title: 'Overlays/HelpButton',
  component: HelpButton,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ height: '500px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    onSubmit: fn(),
  },
};
