import { Tooltip } from './Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '60px', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export const Top = {
  args: { text: 'Tooltip on top', position: 'top', children: 'Hover me' },
};

export const Bottom = {
  args: { text: 'Tooltip on bottom', position: 'bottom', children: 'Hover me' },
};

export const Left = {
  args: { text: 'Tooltip on left', position: 'left', children: 'Hover me' },
};

export const Right = {
  args: { text: 'Tooltip on right', position: 'right', children: 'Hover me' },
};
