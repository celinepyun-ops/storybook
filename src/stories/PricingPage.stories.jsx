import { fn } from 'storybook/test';
import { PricingPage } from './PricingPage';

export default {
  title: 'Pages/Pricing',
  component: PricingPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  args: {
    onNavigate: fn(),
    onSignIn: fn(),
    onGetStarted: fn(),
  },
};
