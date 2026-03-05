import { fn } from 'storybook/test';
import { Search } from './Search';

export default {
  title: 'Navigation/Search',
  component: Search,
  tags: ['autodocs'],
};

export const Empty = {
  args: {
    placeholder: 'Search brands...',
    onChange: fn(),
  },
};

export const WithValue = {
  args: {
    value: 'Amazon',
    onChange: fn(),
    onClear: fn(),
  },
};

export const Loading = {
  args: {
    value: 'Searching...',
    loading: true,
    onChange: fn(),
  },
};
