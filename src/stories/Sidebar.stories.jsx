import { fn } from 'storybook/test';
import { Sidebar } from './Sidebar';

const sampleItems = [
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
      { id: 'contacts', label: 'Contacts', icon: '👥', onClick: fn() },
      { id: 'settings', label: 'Settings', icon: '⚙️', onClick: fn() },
    ],
  },
];

export default {
  title: 'Layout/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ height: '500px', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    items: sampleItems,
    activeItem: 'dashboard',
  },
};

export const Collapsed = {
  args: {
    items: sampleItems,
    activeItem: 'campaigns',
    collapsed: true,
  },
};

export const WithHeader = {
  args: {
    items: sampleItems,
    activeItem: 'brands',
    header: (
      <div style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>
        Outreach AI
      </div>
    ),
  },
};
