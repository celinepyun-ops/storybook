import { StatsCard } from './StatsCard';

export default {
  title: 'Data Display/StatsCard',
  component: StatsCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const TrendUp = {
  args: {
    title: 'Total Outreach',
    value: '1,234',
    change: '+12.5% from last month',
    trend: 'up',
    icon: '📧',
  },
};

export const TrendDown = {
  args: {
    title: 'Response Rate',
    value: '24.3%',
    change: '-3.2% from last month',
    trend: 'down',
    icon: '📉',
  },
};

export const Neutral = {
  args: {
    title: 'Active Campaigns',
    value: '8',
    change: 'No change',
    trend: 'neutral',
    icon: '🎯',
  },
};

export const NoChange = {
  args: {
    title: 'Products Contacted',
    value: '456',
    icon: '🏪',
  },
};
