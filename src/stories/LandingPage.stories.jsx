import { fn } from 'storybook/test';
import { LandingPage } from './LandingPage';

export default {
  title: 'Pages/Landing',
  component: LandingPage,
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
