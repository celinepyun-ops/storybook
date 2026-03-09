import { fn } from 'storybook/test';
import { MarketingNavbar } from './MarketingNavbar';

export default {
  title: 'Components/MarketingNavbar',
  component: MarketingNavbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  args: {
    activePage: 'landing',
    onNavigate: fn(),
    onSignIn: fn(),
    onGetStarted: fn(),
  },
};

export const ProductActive = {
  args: {
    activePage: 'product',
    onNavigate: fn(),
    onSignIn: fn(),
    onGetStarted: fn(),
  },
};

export const PricingActive = {
  args: {
    activePage: 'pricing',
    onNavigate: fn(),
    onSignIn: fn(),
    onGetStarted: fn(),
  },
};
