import { fn } from 'storybook/test';
import { ProductPage } from './ProductPage';

export default {
  title: 'Pages/Product',
  component: ProductPage,
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
