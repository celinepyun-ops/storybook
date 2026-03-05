import { fn } from 'storybook/test';
import { Pagination } from './Pagination';

export default {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { onPageChange: fn() },
};

export const Default = {
  args: { currentPage: 1, totalPages: 10 },
};

export const MiddlePage = {
  args: { currentPage: 5, totalPages: 10 },
};

export const LastPage = {
  args: { currentPage: 10, totalPages: 10 },
};

export const FewPages = {
  args: { currentPage: 2, totalPages: 3 },
};

export const ManyPages = {
  args: { currentPage: 15, totalPages: 50, siblingCount: 2 },
};
