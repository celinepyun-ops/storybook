import { Breadcrumbs } from './Breadcrumbs';

export default {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Campaigns', href: '#' },
      { label: 'Product Outreach Q1' },
    ],
  },
};

export const TwoLevels = {
  args: {
    items: [
      { label: 'Dashboard', href: '#' },
      { label: 'Analytics' },
    ],
  },
};

export const CustomSeparator = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Settings', href: '#' },
      { label: 'Profile' },
    ],
    separator: '›',
  },
};
