import { fn } from 'storybook/test';
import { Tabs } from './Tabs';

const sampleTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'settings', label: 'Settings' },
];

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    tabs: sampleTabs,
    activeTab: 'overview',
    onTabChange: fn(),
  },
};

export const Underline = {
  args: { variant: 'underline' },
};

export const Pill = {
  args: { variant: 'pill' },
};
