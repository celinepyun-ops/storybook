import { fn } from 'storybook/test';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { Avatar } from './Avatar';
import { Dropdown } from './Dropdown';
import { Button } from './Button';

export default {
  title: 'Layout/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  args: {},
};

export const WithSearch = {
  args: {
    children: <Search placeholder="Search brands..." onChange={fn()} />,
    actions: (
      <>
        <Dropdown
          trigger={<Avatar initials="JD" size="small" />}
          items={[
            { label: 'Profile', onClick: fn() },
            { label: 'Settings', onClick: fn() },
            { divider: true },
            { label: 'Sign out', onClick: fn() },
          ]}
          align="right"
        />
      </>
    ),
  },
};

export const WithActions = {
  args: {
    actions: (
      <>
        <Button variant="ghost" label="Help" size="small" />
        <Avatar initials="OA" size="small" />
      </>
    ),
  },
};
