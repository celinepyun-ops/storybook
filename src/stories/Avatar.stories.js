import { Avatar } from './Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export const WithInitials = {
  args: { initials: 'AB', size: 'medium' },
};

export const WithImage = {
  args: { src: 'https://i.pravatar.cc/150?img=3', initials: 'JD', size: 'medium' },
};

export const Small = {
  args: { initials: 'SM', size: 'small' },
};

export const Large = {
  args: { src: 'https://i.pravatar.cc/150?img=5', initials: 'LG', size: 'large' },
};
