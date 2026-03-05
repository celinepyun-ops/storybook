import { Table } from './Table';
import { Badge } from './Badge';

const sampleColumns = [
  { key: 'brand', label: 'Brand' },
  { key: 'contact', label: 'Contact' },
  { key: 'status', label: 'Status', render: (val) => <Badge label={val} variant={val === 'Active' ? 'success' : val === 'Pending' ? 'warning' : 'info'} size="small" /> },
  { key: 'sent', label: 'Emails Sent' },
  { key: 'rate', label: 'Response Rate' },
];

const sampleData = [
  { brand: 'EcoGlow Naturals', contact: 'Sarah Chen', status: 'Active', sent: 145, rate: '32%' },
  { brand: 'TechVibe Audio', contact: 'Marcus Johnson', status: 'Pending', sent: 89, rate: '18%' },
  { brand: 'PureHome Essentials', contact: 'Emily Davis', status: 'Active', sent: 234, rate: '28%' },
  { brand: 'FitPro Gear', contact: 'Alex Rivera', status: 'Paused', sent: 56, rate: '22%' },
  { brand: 'CloudNine Bedding', contact: 'Jordan Lee', status: 'Active', sent: 178, rate: '35%' },
];

export default {
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
};

export const Striped = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    striped: true,
  },
};

export const Sortable = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    sortable: true,
  },
};

export const Selectable = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    selectable: true,
  },
};

export const Loading = {
  args: {
    columns: sampleColumns,
    data: [],
    loading: true,
  },
};

export const Empty = {
  args: {
    columns: sampleColumns,
    data: [],
    emptyMessage: 'No brands found',
  },
};
