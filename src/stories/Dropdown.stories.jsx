import { useState } from 'react';
import { fn } from 'storybook/test';
import { Dropdown } from './Dropdown';
import { Button } from './Button';
import { Icons } from './icons';

export default {
  title: 'Overlays/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ padding: '100px 60px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    trigger: <Button variant="outline" label="Options" />,
    items: [
      { label: 'Edit', onClick: fn() },
      { label: 'Duplicate', onClick: fn() },
      { label: 'Archive', onClick: fn() },
      { divider: true },
      { label: 'Delete', danger: true, onClick: fn() },
    ],
  },
};

export const AlignRight = {
  args: {
    trigger: <Button variant="outline" label="More" />,
    align: 'right',
    items: [
      { label: 'Profile', icon: Icons.profile, onClick: fn() },
      { label: 'Settings', icon: Icons.settings, onClick: fn() },
      { divider: true },
      { label: 'Sign out', icon: Icons.signout, onClick: fn() },
    ],
  },
};

const WithToggleRender = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <Dropdown
      trigger={<Button variant="outline" label="Settings" />}
      items={[
        { label: 'Profile', icon: Icons.profile, onClick: fn() },
        { label: 'Settings', icon: Icons.settings, onClick: fn() },
        { divider: true },
        {
          label: 'Dark Mode',
          icon: Icons.moon,
          toggle: true,
          checked: darkMode,
          onToggle: (val) => {
            setDarkMode(val);
            document.documentElement.dataset.theme = val ? 'dark' : '';
          },
        },
        { divider: true },
        { label: 'Sign out', icon: Icons.signout, onClick: fn() },
      ]}
    />
  );
};

export const WithToggle = {
  render: () => <WithToggleRender />,
};
