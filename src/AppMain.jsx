import { useState, useEffect } from 'react';
import './App.css';
import './stories/tokens.css';
import './stories/fonts.css';
import { PageLayout } from './stories/PageLayout';
import { Sidebar } from './stories/Sidebar';
import { Navbar } from './stories/Navbar';
import { Search } from './stories/Search';
import { Avatar } from './stories/Avatar';
import { HelpButton } from './stories/HelpButton';
import { StatsCard } from './stories/StatsCard';
import { Table } from './stories/Table';
import { Badge } from './stories/Badge';
import { Tabs } from './stories/Tabs';
import { Breadcrumbs } from './stories/Breadcrumbs';
import { Button } from './stories/Button';
import { Select } from './stories/Select';
import { NotFound } from './stories/NotFound';
import { Login } from './stories/Login';
import { SignUp } from './stories/SignUp';
import { Settings } from './stories/Settings';
import { Icons } from './stories/icons';
import './stories/searchpage.css';

const MARKETING_URL = 'http://localhost:5173';
const noop = () => {};

/* ── Sidebar footer ──────────────────────────────────────────────── */
const SidebarFooter = ({ darkMode, onToggleDark, onProfileClick, onSettingsClick }) => (
  <ul className="oai-sidebar__list">
    <li>
      <button className="oai-sidebar__item" onClick={noop}>
        <span className="oai-sidebar__icon">{Icons.contacts}</span>
        <span className="oai-sidebar__label">Support</span>
      </button>
    </li>
    <li>
      <button className="oai-sidebar__item" onClick={onSettingsClick}>
        <span className="oai-sidebar__icon">{Icons.settings}</span>
        <span className="oai-sidebar__label">Settings</span>
      </button>
    </li>
    <li>
      <button
        className="oai-sidebar__item oai-sidebar__item--toggle"
        role="switch"
        aria-checked={darkMode}
        onClick={() => onToggleDark(!darkMode)}
      >
        <span className="oai-sidebar__icon">{Icons.moon}</span>
        <span className="oai-sidebar__label">Dark Mode</span>
        <span className={`oai-sidebar__toggle ${darkMode ? 'oai-sidebar__toggle--checked' : ''}`}>
          <span className="oai-sidebar__toggle-knob" />
        </span>
      </button>
    </li>
    <li>
      <button className="oai-sidebar__item" onClick={onProfileClick}>
        <span className="oai-sidebar__icon"><Avatar initials="JD" size="small" /></span>
        <span className="oai-sidebar__label">Jane Doe</span>
      </button>
    </li>
  </ul>
);

/* ── Sidebar header ──────────────────────────────────────────────── */
const sidebarHeader = (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
    <span style={{ color: 'var(--color-primary-600)', display: 'flex' }}>{Icons.logo(34)}</span>
    <span style={{ fontFamily: 'var(--font-family-serif)', fontWeight: 400, fontSize: '20px', color: 'var(--color-text-primary)' }}>Outreach AI</span>
  </div>
);

/* ── Dashboard data ──────────────────────────────────────────────── */
const tableColumns = [
  { key: 'brand', label: 'Brand' },
  { key: 'contact', label: 'Contact' },
  { key: 'status', label: 'Status', render: (val) => <Badge label={val} variant={val === 'Active' ? 'success' : val === 'Pending' ? 'warning' : val === 'Paused' ? 'error' : 'info'} size="small" /> },
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

/* ── Page: Dashboard ─────────────────────────────────────────────── */
const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState('all');
  return (
    <div style={{ maxWidth: '1200px' }}>
      <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Dashboard' }]} />
      <div style={{ marginTop: '16px', marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 400, color: 'var(--color-text-primary)' }}>Dashboard</h1>
        <p style={{ margin: 0, fontFamily: 'var(--font-family-sans)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Welcome back, Jane. Here's your outreach overview.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <StatsCard title="Total Outreach" value="1,234" change="+12.5% from last month" trend="up" icon={Icons.campaigns} />
        <StatsCard title="Response Rate" value="28.4%" change="+3.2% from last month" trend="up" icon={Icons.analytics} />
        <StatsCard title="Active Campaigns" value="8" change="No change" trend="neutral" icon={Icons.dashboard} />
        <StatsCard title="Brands Contacted" value="456" change="-2.1% from last month" trend="down" icon={Icons.brands} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <Tabs tabs={[{ id: 'all', label: 'All Brands' }, { id: 'active', label: 'Active' }, { id: 'pending', label: 'Pending' }, { id: 'archived', label: 'Archived' }]} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <Table columns={tableColumns} data={tableData} sortable striped />
    </div>
  );
};

/* ── Search Results mock data ─────────────────────────────────────── */
const searchResults = [
  { title: 'CeraVe Moisturizing Cream, Body and Face Moisturizer for Dry Ski...', asin: 'B00TTD9BRC', brand: 'CeraVe', price: '$18.96', rating: 4.7, reviews: 138412 },
  { title: 'La Roche-Posay Toleriane Double Repair Face Moisturizer, Daily M...', asin: 'B01N95PQHQ', brand: 'La Roche-Posay', price: '$24.99', rating: 4.6, reviews: 46666 },
  { title: 'CeraVe PM Facial Moisturizing Lotion, Night Cream with Hyaluron...', asin: 'B00365DABC', brand: 'CeraVe', price: '$14.87', rating: 4.7, reviews: 58786 },
  { title: 'Neutrogena Hydro Boost Water Gel Face Moisturizer with Hyaluroni...', asin: 'B00NR1YQHM', brand: 'Neutrogena', price: '$19.42', rating: 4.6, reviews: 72341 },
  { title: "Kiehl's Ultra Facial Cream, with 4.5% Squalane to Strengthen Ski...", asin: 'B004JVSWVU', brand: "Kiehl's", price: 'N/A', rating: 4.7, reviews: 5741 },
  { title: 'Olay Face Moisturizer, Regenerist Micro-Sculpting Cream for Wo...', asin: 'B007M81B4M', brand: 'Olay', price: '$24.94', rating: 4.6, reviews: 32829 },
  { title: "L'Oreal Paris Collagen Daily Face Moisturizer, Anti Aging Face Cre...", asin: 'B002JDUMFO', brand: "L'Oreal Paris", price: '$9.99', rating: 4.5, reviews: 51486 },
  { title: 'SimplyVital Collagen, Retinol & Hyaluronic Acid Cream - Anti-Agin...', asin: 'B08BSP2JNQ', brand: 'SimplyVital', price: 'N/A', rating: 4.4, reviews: 29018 },
  { title: 'The Ordinary Natural Moisturizing Factors + Hyaluronic Acid, Ligh...', asin: 'B0711DTHY2', brand: 'The Ordinary', price: '$6.70', rating: 4.6, reviews: 19216 },
  { title: 'Cetaphil Face & Body Moisturizer, Hydrating Moisturizing Cream f...', asin: 'B01H20MA62', brand: 'Cetaphil', price: '$19.48', rating: 4.7, reviews: 34147 },
  { title: 'Vanicream Daily Facial Moisturizer With Ceramides and Hyaluron...', asin: 'B088W4BXXK', brand: 'Vanicream', price: '$13.97', rating: 4.6, reviews: 21135 },
  { title: "POND'S Nourishing Moisturizing Cream, Crema S 14.1 oz", asin: 'B001FDJ71', brand: "POND'S", price: '$7.74', rating: 4.7, reviews: 12626 },
];

/* ── Page: Search Brands ─────────────────────────────────────────── */
const SearchBrandsContent = () => {
  const [keyword, setKeyword] = useState('facial cream');
  const [limit, setLimit] = useState('20');
  const [minRating, setMinRating] = useState('');
  const [hasSearched, setHasSearched] = useState(true);
  const [selected, setSelected] = useState([]);

  const toggleSelect = (asin) => {
    setSelected((prev) => prev.includes(asin) ? prev.filter((a) => a !== asin) : [...prev, asin]);
  };

  const toggleAll = () => {
    if (selected.length === searchResults.length) {
      setSelected([]);
    } else {
      setSelected(searchResults.map((r) => r.asin));
    }
  };

  return (
    <div style={{ maxWidth: '1100px' }}>
      <div className="oai-search-page__header">
        <h1 className="oai-search-page__title">Search Amazon Products</h1>
        <p className="oai-search-page__subtitle">Find top-selling and fast-growing brands to target for outreach.</p>
      </div>

      {/* Search form card */}
      <div className="oai-search-card">
        <div className="oai-search-card__form-grid">
          <div className="oai-search-card__field oai-search-card__field--keyword">
            <label className="oai-search-card__label">Keyword</label>
            <input className="oai-search-card__text-input" type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g. facial cream, sunscreen, vitamins" />
          </div>
          <div className="oai-search-card__field oai-search-card__field--limit">
            <label className="oai-search-card__label">Limit</label>
            <input className="oai-search-card__text-input" type="number" value={limit} onChange={(e) => setLimit(e.target.value)} />
          </div>
        </div>
        <div className="oai-search-card__form-row">
          <div className="oai-search-card__field oai-search-card__field--rating">
            <label className="oai-search-card__label">Min Rating (Optional)</label>
            <input className="oai-search-card__text-input" type="text" value={minRating} onChange={(e) => setMinRating(e.target.value)} placeholder="e.g., 4.0" />
          </div>
          <button className="oai-search-card__search-btn" onClick={() => setHasSearched(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            Search
          </button>
        </div>
      </div>

      {/* Search Results */}
      {hasSearched && (
        <div className="oai-results">
          <h2 className="oai-results__title">Search Results</h2>
          <div className="oai-results__table-wrap">
            <table className="oai-results__table">
              <thead>
                <tr>
                  <th className="oai-results__th oai-results__th--check">
                    <input type="checkbox" checked={selected.length === searchResults.length} onChange={toggleAll} />
                  </th>
                  <th className="oai-results__th oai-results__th--image">Image</th>
                  <th className="oai-results__th oai-results__th--title">Title</th>
                  <th className="oai-results__th">Brand</th>
                  <th className="oai-results__th">Price</th>
                  <th className="oai-results__th">Rating</th>
                  <th className="oai-results__th oai-results__th--reviews">Reviews</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((product) => (
                  <tr key={product.asin} className={`oai-results__row ${selected.includes(product.asin) ? 'oai-results__row--selected' : ''}`}>
                    <td className="oai-results__td oai-results__td--check">
                      <input type="checkbox" checked={selected.includes(product.asin)} onChange={() => toggleSelect(product.asin)} />
                    </td>
                    <td className="oai-results__td oai-results__td--image">
                      <div className="oai-results__image-placeholder" />
                    </td>
                    <td className="oai-results__td oai-results__td--title">
                      <div className="oai-results__product-title">{product.title}</div>
                      <div className="oai-results__product-asin">ASIN: {product.asin}</div>
                    </td>
                    <td className="oai-results__td">{product.brand}</td>
                    <td className="oai-results__td">{product.price}</td>
                    <td className="oai-results__td">
                      <span className="oai-results__rating">★ {product.rating}</span>
                    </td>
                    <td className="oai-results__td oai-results__td--reviews">{product.reviews.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Products in list */}
          <div className="oai-results__list-section">
            <h3 className="oai-results__list-title">
              Products in This List
              <span className="oai-results__list-count">{selected.length}</span>
            </h3>
            {selected.length === 0 ? (
              <div className="oai-results__list-empty">
                <div className="oai-results__list-empty-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M8 12h8" />
                  </svg>
                </div>
                <p>No products in this list yet. Search and add products above.</p>
              </div>
            ) : (
              <div className="oai-results__list-items">
                {searchResults.filter((r) => selected.includes(r.asin)).map((product) => (
                  <div key={product.asin} className="oai-results__list-item">
                    <div className="oai-results__image-placeholder oai-results__image-placeholder--sm" />
                    <div className="oai-results__list-item-info">
                      <span className="oai-results__list-item-name">{product.title}</span>
                      <span className="oai-results__list-item-brand">{product.brand}</span>
                    </div>
                    <button className="oai-results__list-item-remove" onClick={() => toggleSelect(product.asin)}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Page: Email Templates ───────────────────────────────────────── */
const TemplatesContent = () => (
  <div style={{ maxWidth: '1100px' }}>
    <div className="oai-templates__header">
      <div>
        <h1 className="oai-templates__title">Email Templates</h1>
        <p className="oai-templates__subtitle">Create and manage reusable email templates</p>
      </div>
      <button className="oai-templates__new-btn" onClick={noop}>
        + New Template
      </button>
    </div>
    <div className="oai-templates__empty">
      <div className="oai-templates__empty-icon">
        {Icons.templates}
      </div>
      <h2 className="oai-templates__empty-title">No templates yet</h2>
      <p className="oai-templates__empty-desc">Create your first email template to speed up your outreach</p>
      <button className="oai-templates__create-btn" onClick={noop}>
        + Create Template
      </button>
    </div>
  </div>
);

/* ── Emails mock data ────────────────────────────────────────────── */
const emailQueue = [
  {
    id: 1,
    to: { name: 'Sarah Chen', email: 'sarah.chen@ecoglow.com', title: 'Head of Partnerships, EcoGlow Naturals', company: 'EcoGlow Naturals', location: 'San Francisco, CA, United States' },
    subject: 'Partnership opportunity for EcoGlow Naturals',
    body: `Hey Sarah,\n\nI saw you are leading partnerships at EcoGlow Naturals and driving the brand's expansion on Amazon. Given how fast the clean beauty category is growing, I imagine scaling your seller network is a big priority right now.\n\nWe specialize in helping top-tier beauty brands like EcoGlow connect with high-performing Amazon sellers. We can help your products reach new audiences and increase sales velocity, eliminating the overhead of managing individual seller relationships.\n\nCurious if expanding your Amazon seller network is on your radar this quarter?\n\nBest,\n\nJane Doe\nOutreach AI`,
    signals: [
      { label: 'Head of Partnerships — EcoGlow Naturals', expandable: true },
      { label: 'Recent Hire — Mar 2025', expandable: true, detail: 'She started the Head of Partnerships position in March 2025, so she is newly responsible for shaping the partnership strategy and may be actively building new vendor pipelines.' },
      { label: 'Clean Beauty Category Growth', expandable: true, detail: 'EcoGlow Naturals is rapidly growing in clean beauty on Amazon; as Head of Partnerships she likely prioritizes expanding distribution channels.' },
    ],
  },
  {
    id: 2,
    to: { name: 'Marcus Johnson', email: 'marcus@techvibe.com', title: 'Brand Manager, TechVibe Audio', company: 'TechVibe Audio', location: 'Austin, TX, United States' },
    subject: 'Amazon growth strategy for TechVibe Audio',
    body: `Hey Marcus,\n\nI noticed TechVibe Audio has been gaining serious traction in the wireless earbuds category on Amazon. Your latest product launch looks impressive.\n\nWe help audio brands optimize their Amazon presence — from listing optimization to review management and advertising strategy. Our clients typically see a 40% increase in organic ranking within 90 days.\n\nWould you be open to a quick chat about how we could help TechVibe scale even faster?\n\nBest,\n\nJane Doe\nOutreach AI`,
    signals: [
      { label: 'Brand Manager — TechVibe Audio', expandable: true },
      { label: 'Product Launch — Feb 2025', expandable: true, detail: 'TechVibe recently launched new wireless earbuds, suggesting active investment in Amazon growth.' },
    ],
  },
];

/* ── Page: Emails ────────────────────────────────────────────────── */
const EmailsContent = () => {
  const [activeEmailTab, setActiveEmailTab] = useState('review');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedSignal, setExpandedSignal] = useState(1);

  const emailTabs = [
    { id: 'review', label: 'For Review', count: emailQueue.length },
    { id: 'queue', label: 'Queue', count: 0 },
    { id: 'drafting', label: 'Drafting', count: 0 },
    { id: 'sent', label: 'Sent', count: 0 },
    { id: 'failed', label: 'Failed', count: 0 },
  ];

  const currentEmail = emailQueue[currentIndex];

  return (
    <div style={{ maxWidth: '1200px' }}>
      {/* Connect email banner */}
      <div className="oai-emails__banner">
        <span className="oai-emails__banner-icon">{Icons.campaigns}</span>
        <span className="oai-emails__banner-text">Connect your email to start sending outreach</span>
        <button className="oai-emails__banner-btn" onClick={noop}>Connect Email</button>
      </div>

      {/* Header */}
      <div className="oai-emails__header">
        <div className="oai-emails__header-left">
          <h1 className="oai-emails__title">{Icons.campaigns} Emails</h1>
        </div>
        <div className="oai-emails__header-right">
          <span className="oai-emails__count">0 / 35 today</span>
          <Badge label="Active" variant="success" size="small" />
          <button className="oai-emails__action-btn" onClick={noop}>❚❚ Pause</button>
          <button className="oai-emails__action-btn oai-emails__action-btn--danger" onClick={noop}>■ Stop All</button>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="oai-emails__toolbar">
        <div className="oai-emails__tabs">
          {emailTabs.map((tab) => (
            <button
              key={tab.id}
              className={`oai-emails__tab ${activeEmailTab === tab.id ? 'oai-emails__tab--active' : ''}`}
              onClick={() => setActiveEmailTab(tab.id)}
            >
              {tab.label}
              <span className={`oai-emails__tab-count ${activeEmailTab === tab.id && tab.count > 0 ? 'oai-emails__tab-count--active' : ''}`}>{tab.count}</span>
            </button>
          ))}
        </div>
        <div className="oai-emails__search-wrap">
          <Search placeholder="Search by name, email, or subject..." onChange={noop} />
        </div>
      </div>

      {/* Email content */}
      {activeEmailTab === 'review' && currentEmail ? (
        <div className="oai-emails__content">
          {/* Email preview */}
          <div className="oai-emails__preview">
            {/* To line + navigation */}
            <div className="oai-emails__to-row">
              <span className="oai-emails__to-label">To:</span>
              <span className="oai-emails__to-name">{currentEmail.to.name}</span>
              <span className="oai-emails__to-email">&lt;{currentEmail.to.email}&gt;</span>
              <div className="oai-emails__nav">
                <button className="oai-emails__nav-btn" onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0}>&lt;</button>
                <span className="oai-emails__nav-count">{currentIndex + 1}/{emailQueue.length}</span>
                <button className="oai-emails__nav-btn" onClick={() => setCurrentIndex(Math.min(emailQueue.length - 1, currentIndex + 1))} disabled={currentIndex === emailQueue.length - 1}>&gt;</button>
              </div>
            </div>

            {/* Subject */}
            <div className="oai-emails__subject">{currentEmail.subject}</div>

            {/* Body */}
            <div className="oai-emails__body">
              {currentEmail.body.split('\n').map((line, i) => (
                <p key={i} className="oai-emails__body-line">{line || '\u00A0'}</p>
              ))}
            </div>

            {/* Actions */}
            <div className="oai-emails__actions">
              <button className="oai-emails__delete-btn" onClick={noop}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
              </button>
              <div className="oai-emails__actions-right">
                <button className="oai-emails__asap-btn" onClick={noop}>{Icons.sparkle} ASAP</button>
                <button className="oai-emails__approve-btn" onClick={noop}>✓ Approve to Send</button>
              </div>
            </div>
          </div>

          {/* Contact sidebar */}
          <div className="oai-emails__contact">
            <div className="oai-emails__contact-header">
              <Avatar initials={currentEmail.to.name.split(' ').map(n => n[0]).join('')} size="medium" />
              <div>
                <div className="oai-emails__contact-name">{currentEmail.to.name}</div>
                <div className="oai-emails__contact-title">{currentEmail.to.title}</div>
                <div className="oai-emails__contact-company">{currentEmail.to.company}</div>
              </div>
            </div>
            <div className="oai-emails__contact-details">
              <div className="oai-emails__contact-row">{Icons.campaigns} {currentEmail.to.email}</div>
              <div className="oai-emails__contact-row">📍 {currentEmail.to.location}</div>
            </div>
            <div className="oai-emails__signals">
              <div className="oai-emails__signals-label">KEY SIGNALS</div>
              {currentEmail.signals.map((signal, i) => (
                <div key={i} className="oai-emails__signal">
                  <button className="oai-emails__signal-header" onClick={() => setExpandedSignal(expandedSignal === i ? -1 : i)}>
                    <span>{signal.label}</span>
                    <span className="oai-emails__signal-chevron">{expandedSignal === i ? '∧' : '∨'}</span>
                  </button>
                  {expandedSignal === i && signal.detail && (
                    <div className="oai-emails__signal-detail">{signal.detail}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="oai-emails__empty">
          <div className="oai-emails__empty-icon">{Icons.campaigns}</div>
          <h3 className="oai-emails__empty-title">No emails {activeEmailTab === 'drafting' ? 'drafting' : activeEmailTab === 'sent' ? 'sent' : activeEmailTab === 'failed' ? 'failed' : 'in queue'}</h3>
          <p className="oai-emails__empty-desc">Emails {activeEmailTab === 'drafting' ? 'being drafted' : activeEmailTab === 'sent' ? 'that have been sent' : activeEmailTab === 'failed' ? 'that failed to send' : 'queued for sending'} will appear here</p>
        </div>
      )}

      {/* Keyboard hint */}
      <div className="oai-emails__keyboard-hint">
        <span>⌘ + Enter to approve</span>
        <span>← → to navigate</span>
        <button className="oai-emails__approve-all" onClick={noop}>✓ Approve all</button>
      </div>
    </div>
  );
};

/* ── App with simple path-based routing ──────────────────────────── */
function AppMain() {
  const [page, setPage] = useState(() => {
    const path = window.location.pathname.replace(/^\//, '') || 'login';
    return path;
  });
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const navigate = (p) => {
    setPage(p);
    window.history.pushState({}, '', `/${p}`);
  };

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname.replace(/^\//, '') || 'login';
      setPage(path);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const toggleDark = (val) => {
    setDarkMode(val);
    document.documentElement.dataset.theme = val ? 'dark' : '';
  };

  const goToMarketing = () => { window.location.href = MARKETING_URL; };

  /* ── Auth pages ──────────────────────────────────────────────────── */
  if (page === 'login') {
    return (
      <Login
        onLogin={() => navigate('dashboard')}
        onSignUpClick={() => navigate('signup')}
        onForgotPassword={noop}
      />
    );
  }

  if (page === 'signup') {
    return (
      <SignUp
        onSignUp={() => navigate('dashboard')}
        onLoginClick={() => navigate('login')}
      />
    );
  }

  /* ── Sidebar items ───────────────────────────────────────────────── */
  const sidebarItems = [
    {
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard, onClick: () => navigate('dashboard') },
        { id: 'search-brands', label: 'Search Brands', icon: Icons.search, onClick: () => navigate('search-brands') },
        { id: 'brands', label: 'Brands', icon: Icons.brands, onClick: () => navigate('brands') },
        { id: 'emails', label: 'Emails', icon: Icons.campaigns, onClick: () => navigate('emails') },
        { id: 'templates', label: 'Templates', icon: Icons.templates, onClick: () => navigate('templates') },
        { id: 'campaigns', label: 'Campaigns', icon: Icons.campaigns, onClick: () => navigate('campaigns') },
        { id: 'analytics', label: 'Analytics', icon: Icons.analytics, onClick: () => navigate('analytics') },
      ],
    },
  ];

  if (page === '404') {
    return <NotFound onBackClick={() => navigate('dashboard')} />;
  }

  const renderContent = () => {
    switch (page) {
      case 'dashboard': return <DashboardContent />;
      case 'search-brands': return <SearchBrandsContent />;
      case 'emails': return <EmailsContent />;
      case 'templates': return <TemplatesContent />;
      default: return <NotFound onBackClick={() => navigate('dashboard')} />;
    }
  };

  return (
    <PageLayout
      sidebar={
        <Sidebar
          items={sidebarItems}
          activeItem={page}
          header={sidebarHeader}
          footer={
            <SidebarFooter
              darkMode={darkMode}
              onToggleDark={toggleDark}
              onProfileClick={() => setSettingsOpen(true)}
              onSettingsClick={() => setSettingsOpen(true)}
            />
          }
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      }
      navbar={
        <Navbar>
          <Search placeholder="Search brands..." onChange={noop} />
        </Navbar>
      }
    >
      {renderContent()}
      <HelpButton onSubmit={noop} />
      {settingsOpen && (
        <Settings
          onClose={() => setSettingsOpen(false)}
          onLogout={() => { setSettingsOpen(false); goToMarketing(); }}
          onSave={noop}
        />
      )}
    </PageLayout>
  );
}

export default AppMain;
