import { Card } from './Card';

export default {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export const Primary = {
  args: {
    title: 'Card Title',
    description: 'This is a card component with a primary border style.',
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    title: 'Card Title',
    description: 'This is a card component with a secondary border style.',
    variant: 'secondary',
  },
};

export const Dark = {
  args: {
    title: 'Card Title',
    description: 'This is a card component with a dark mode style.',
    variant: 'dark',
  },
};

export const DarkWithImage = {
  args: {
    title: 'Dark Card With Image',
    description: 'This dark card includes an image at the top.',
    image: 'https://picsum.photos/400/200',
    variant: 'dark',
  },
};

export const WithImage = {
  args: {
    title: 'Card With Image',
    description: 'This card includes an image at the top.',
    image: 'https://picsum.photos/400/200',
    variant: 'primary',
  },
};
