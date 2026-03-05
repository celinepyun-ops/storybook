import { fn } from 'storybook/test';
import { PageLayout } from './PageLayout';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { Avatar } from './Avatar';

const sidebarItems = [
  {
    title: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊', onClick: fn() },
      { id: 'campaigns', label: 'Campaigns', icon: '📧', onClick: fn() },
      { id: 'brands', label: 'Brands', icon: '🏪', onClick: fn() },
      { id: 'analytics', label: 'Analytics', icon: '📈', onClick: fn() },
    ],
  },
  {
    title: 'Manage',
    items: [
      { id: 'templates', label: 'Templates', icon: '📝', onClick: fn() },
      { id: 'settings', label: 'Settings', icon: '⚙️', onClick: fn() },
    ],
  },
];

export default {
  title: 'Layout/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  args: {
    sidebar: <Sidebar items={sidebarItems} activeItem="dashboard" />,
    navbar: (
      <Navbar
        actions={<Avatar initials="JD" size="small" />}
      >
        <Search placeholder="Search..." onChange={fn()} />
      </Navbar>
    ),
    children: (
      <div style={{ padding: '8px' }}>
        <h1 style={{ margin: '0 0 8px', fontFamily: 'var(--oai-font-sans)' }}>Dashboard</h1>
        <p style={{ color: 'var(--oai-text-secondary)', fontFamily: 'var(--oai-font-sans)' }}>
          Welcome to Outreach AI. Select a section from the sidebar to get started.
        </p>
      </div>
    ),
  },
};
