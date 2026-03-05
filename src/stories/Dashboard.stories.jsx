import { fn } from 'storybook/test';
import { PageLayout } from './PageLayout';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { Avatar } from './Avatar';
import { Dropdown } from './Dropdown';
import { StatsCard } from './StatsCard';
import { Table } from './Table';
import { Badge } from './Badge';
import { Tabs } from './Tabs';
import { Breadcrumbs } from './Breadcrumbs';

const sidebarItems = [
  {
    title: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊', onClick: fn() },
      { id: 'campaigns', label: 'Campaigns', icon: '📧', onClick: fn() },
      { id: 'brands', label: 'Brands', icon: '🏪', onClick: fn() },
      { id: 'analytics', label: 'Analytics', icon: '📈', onClick: fn() },
    ],
  },
  {
    title: 'Manage',
    items: [
      { id: 'templates', label: 'Templates', icon: '📝', onClick: fn() },
      { id: 'contacts', label: 'Contacts', icon: '👥', onClick: fn() },
      { id: 'settings', label: 'Settings', icon: '⚙️', onClick: fn() },
    ],
  },
];

const tableColumns = [
  { key: 'brand', label: 'Brand' },
  { key: 'contact', label: 'Contact' },
  { key: 'status', label: 'Status', render: (val) => <Badge label={val} variant={val === 'Active' ? 'success' : val === 'Pending' ? 'warning' : 'info'} size="small" /> },
  { key: 'sent', label: 'Sent' },
  { key: 'rate', label: 'Response Rate' },
];

const tableData = [
  { brand: 'EcoGlow Naturals', contact: 'Sarah Chen', status: 'Active', sent: 145, rate: '32%' },
  { brand: 'TechVibe Audio', contact: 'Marcus Johnson', status: 'Pending', sent: 89, rate: '18%' },
  { brand: 'PureHome Essentials', contact: 'Emily Davis', status: 'Active', sent: 234, rate: '28%' },
  { brand: 'FitPro Gear', contact: 'Alex Rivera', status: 'Paused', sent: 56, rate: '22%' },
  { brand: 'CloudNine Bedding', contact: 'Jordan Lee', status: 'Active', sent: 178, rate: '35%' },
  { brand: 'ZenBrew Coffee', contact: 'Taylor Kim', status: 'Active', sent: 112, rate: '41%' },
];

export default {
  title: 'Pages/Dashboard',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  render: () => (
    <PageLayout
      sidebar={<Sidebar items={sidebarItems} activeItem="dashboard" />}
      navbar={
        <Navbar
          actions={
            <Dropdown
              trigger={<Avatar initials="JD" size="small" />}
              items={[
                { label: 'Profile', icon: '👤', onClick: fn() },
                { label: 'Settings', icon: '⚙️', onClick: fn() },
                { divider: true },
                { label: 'Sign out', icon: '🚪', onClick: fn() },
              ]}
              align="right"
            />
          }
        >
          <Search placeholder="Search brands..." onChange={fn()} />
        </Navbar>
      }
    >
      <div style={{ maxWidth: '1200px' }}>
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Dashboard' }]} />

        <div style={{ marginTop: '16px', marginBottom: '24px' }}>
          <h1 style={{ margin: '0 0 4px', fontFamily: 'var(--oai-font-sans)', fontSize: '24px', fontWeight: 700, color: 'var(--oai-text-primary)' }}>
            Dashboard
          </h1>
          <p style={{ margin: 0, fontFamily: 'var(--oai-font-sans)', fontSize: '14px', color: 'var(--oai-text-secondary)' }}>
            Welcome back, Jane. Here's your outreach overview.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <StatsCard title="Total Outreach" value="1,234" change="+12.5% from last month" trend="up" icon="📧" />
          <StatsCard title="Response Rate" value="28.4%" change="+3.2% from last month" trend="up" icon="💬" />
          <StatsCard title="Active Campaigns" value="8" change="No change" trend="neutral" icon="🎯" />
          <StatsCard title="Brands Contacted" value="456" change="-2.1% from last month" trend="down" icon="🏪" />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Tabs
            tabs={[
              { id: 'all', label: 'All Brands' },
              { id: 'active', label: 'Active' },
              { id: 'pending', label: 'Pending' },
              { id: 'archived', label: 'Archived' },
            ]}
            activeTab="all"
            onTabChange={fn()}
          />
        </div>

        <Table columns={tableColumns} data={tableData} sortable striped />
      </div>
    </PageLayout>
  ),
};
