import { useState } from 'react';
import { fn } from 'storybook/test';
import { PageLayout } from './PageLayout';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Search } from './Search';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { HelpButton } from './HelpButton';
import { Icons } from './icons';
import './searchpage.css';

const sidebarItems = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard, onClick: fn() },
      { id: 'search-brands', label: 'Search Brands', icon: Icons.search, onClick: fn() },
      { id: 'brands', label: 'Brands', icon: Icons.brands, onClick: fn() },
      { id: 'people', label: 'People', icon: Icons.contacts, onClick: fn() },
      { id: 'emails', label: 'Emails', icon: Icons.campaigns, onClick: fn() },
      { id: 'templates', label: 'Templates', icon: Icons.templates, onClick: fn() },
      { id: 'campaigns', label: 'Campaigns', icon: Icons.campaigns, onClick: fn() },
      { id: 'analytics', label: 'Analytics', icon: Icons.analytics, onClick: fn() },
    ],
  },
];

const SidebarFooter = ({ darkMode, onToggleDark }) => (
  <ul className="oai-sidebar__list">
    <li>
      <button className="oai-sidebar__item" onClick={fn()}>
        <span className="oai-sidebar__icon">{Icons.contacts}</span>
        <span className="oai-sidebar__label">Support</span>
      </button>
    </li>
    <li>
      <button className="oai-sidebar__item" onClick={fn()}>
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
      <button className="oai-sidebar__item" onClick={fn()}>
        <span className="oai-sidebar__icon"><Avatar initials="JD" size="small" /></span>
        <span className="oai-sidebar__label">Jane Doe</span>
      </button>
    </li>
  </ul>
);

const sidebarHeader = (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
    <span style={{ color: 'var(--color-primary-600)', display: 'flex' }}>{Icons.logo(34)}</span>
    <span style={{ fontFamily: 'var(--font-family-serif)', fontWeight: 400, fontSize: '20px', color: 'var(--color-text-primary)' }}>Outreach AI</span>
  </div>
);

/* ── Mock data ─────────────────────────────────────────────────────── */

const defaultTags = [
  'Vendor Manager',
  'Category Manager',
  'Business Development',
  'Brand Manager',
  'Buyer',
];

const brands = [
  { name: 'Arbonne', company: 'Arbonne International LLC', domain: 'arbonne.com', country: 'United States', state: 'California', city: 'Irvine' },
  { name: 'The Ordinary', company: 'Deciem Beauty Group Inc.', domain: 'theordinary.com', country: 'Canada', state: 'Ontario', city: 'Toronto' },
  { name: 'Dr.Althea', company: 'Dr.Althea Co. Ltd.', domain: 'dralthea.com', country: 'South Korea', state: '\u2014', city: 'Seoul' },
  { name: 'SimplyVital', company: 'SimplyVital Health Inc.', domain: 'simplyvitalhealth.com', country: 'United States', state: 'Connecticut', city: 'New Haven' },
  { name: 'Vanicream', company: 'Vanicream LLC', domain: 'vanicream.com', country: 'United States', state: 'Illinois', city: 'Chicago' },
  { name: 'OUPEICHARM', company: 'OUPEICHARM', domain: 'oupeicharm.com', country: 'China', state: '\u2014', city: '\u2014' },
];

const people = [
  { id: 1, name: 'Hannah Weaver', title: 'Senior Vendor Manager Premium Beauty', company: 'Amazon', location: 'New York', initials: 'HW', tags: ['Category Decision-Maker', 'Amazon Investing in Beauty'] },
  { id: 2, name: 'David Lee', title: 'Category Leader Mass Beauty & Groomi...', company: 'Amazon', location: 'Seattle', initials: 'DL', tags: ['Mass Beauty Category Leader', 'Amazon Vendor Management Experience'] },
  { id: 3, name: 'Brynn Kemper', title: 'Senior Manager Business Development a...', company: 'Amazon', location: 'Seattle', initials: 'BK', tags: ['Senior Manager Premium Beauty', 'Premium Beauty & Luxury Focus'] },
  { id: 4, name: 'Molly Ayers', title: 'TikTok Shop Category Manager - Beauty', company: 'TikTok', location: 'Seattle', initials: 'MA', tags: ['Beauty Category Owner', 'Experienced Buyer & Vendor Lead'] },
  { id: 5, name: 'Asia Jenkins', title: 'Category Manager Beauty @ TikTok Shop', company: 'TikTok', location: 'New York', initials: 'AJ', tags: ['Category Manager \u2014 Decision-Maker', 'Buying/Purchasing Background'] },
  { id: 6, name: 'Nikki Hardison', title: 'Senior Business Development Manager -...', company: 'Amazon', location: 'New York', initials: 'NH', tags: ['Premium Beauty BD Lead', 'Recent LinkedIn Engagement'] },
  { id: 7, name: 'Daniela Kretschmar', title: 'Sr. Vendor Manager Beauty Skin Care', company: 'Amazon', location: 'Miami', initials: 'DK', tags: ['Senior Vendor Manager \u2014 Mass Beauty', 'Category & Assortment Owner'] },
];

/* ── Inline icon helpers ───────────────────────────────────────────── */

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ViewIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const SaveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const BullseyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export default {
  title: 'Pages/People',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

const PeoplePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [titleTags, setTitleTags] = useState([...defaultTags]);
  const [titleInput, setTitleInput] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && titleInput.trim()) {
      setTitleTags([...titleTags, titleInput.trim()]);
      setTitleInput('');
    }
  };

  const handleRemoveTag = (index) => {
    setTitleTags(titleTags.filter((_, i) => i !== index));
  };

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleTogglePerson = (id) => {
    setSelectedPeople((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPeople([]);
    } else {
      setSelectedPeople(people.map((p) => p.id));
    }
    setSelectAll(!selectAll);
  };

  return (
    <PageLayout
      sidebar={
        <Sidebar
          items={sidebarItems}
          activeItem="people"
          header={sidebarHeader}
          footer={<SidebarFooter darkMode={darkMode} onToggleDark={(val) => { setDarkMode(val); document.documentElement.dataset.theme = val ? 'dark' : ''; }} />}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      }
      navbar={
        <Navbar>
          <Search placeholder="Search brands..." onChange={fn()} />
        </Navbar>
      }
    >
      <div style={{ maxWidth: '1200px' }}>
        {/* Find Decision Makers card */}
        <div className="oai-people__finder">
          <h2 className="oai-people__finder-title">{Icons.contacts} Find Decision Makers</h2>

          <div className="oai-people__finder-input-row">
            <input
              className="oai-people__finder-input"
              type="text"
              placeholder="Type a job title and press Enter..."
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </div>

          {titleTags.length > 0 && (
            <div className="oai-people__finder-tags">
              {titleTags.map((tag, i) => (
                <span key={i} className="oai-people__finder-tag">
                  {tag}
                  <button className="oai-people__finder-tag-remove" onClick={() => handleRemoveTag(i)}>&times;</button>
                </span>
              ))}
            </div>
          )}

          <button className="oai-people__finder-search-btn" onClick={handleSearch}>
            {Icons.search} Find Contacts for All {brands.length} Brands
          </button>
        </div>

        {/* Brands in This List table */}
        <div className="oai-people__brands">
          <h3 className="oai-people__brands-title">
            Brands in This List <span className="oai-people__brands-count">{brands.length}</span>
          </h3>
          <div className="oai-people__brands-table-wrap">
            <table className="oai-people__brands-table">
              <thead>
                <tr>
                  <th>Brand Name</th>
                  <th>Company Name</th>
                  <th>Domain</th>
                  <th>Country</th>
                  <th>State</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((b, i) => (
                  <tr key={i}>
                    <td className="oai-people__brands-td--bold">{b.name}</td>
                    <td>{b.company}</td>
                    <td>{b.domain}</td>
                    <td>{b.country}</td>
                    <td>{b.state}</td>
                    <td>{b.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results (shown after clicking search) */}
        {showResults && (
          <>
            {/* Results header with stats and actions */}
            <div className="oai-people__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
                <div className="oai-people__stat-box">
                  <div className="oai-people__stat-num">7</div>
                  <div className="oai-people__stat-lbl">Saved</div>
                </div>
                <div className="oai-people__stat-box">
                  <div className="oai-people__stat-num">0</div>
                  <div className="oai-people__stat-lbl">Emails</div>
                </div>
              </div>
              <div className="oai-people__header-actions">
                <button className="oai-people__find-btn" onClick={fn()}>{Icons.search} Find More</button>
                <button className="oai-people__export-btn" onClick={fn()}>Export</button>
                <button className="oai-people__outbound-btn" onClick={fn()}>{Icons.campaigns} Outbound</button>
              </div>
            </div>

            {/* Filter toolbar */}
            <div className="oai-people__toolbar">
              <div className="oai-people__filters">
                <div className="oai-people__search-input">
                  <Search placeholder="Search..." onChange={fn()} />
                </div>
                <button className="oai-people__filter-btn" onClick={fn()}>Company &#9662;</button>
                <button className="oai-people__filter-btn" onClick={fn()}>Location &#9662;</button>
                <button className="oai-people__filter-btn" onClick={fn()}>Title &#9662;</button>
              </div>
              <div className="oai-people__filters-right">
                <button className="oai-people__filter-btn" onClick={fn()}>Sort: Intent &#9662;</button>
                <label className="oai-people__select-all">
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                  Select all
                </label>
              </div>
            </div>

            {/* Date row */}
            <div className="oai-people__date-row">
              <span className="oai-people__date">March 9, 2026</span>
              <span className="oai-people__lead-count">{people.length} leads</span>
            </div>

            {/* People list */}
            <div className="oai-people__list">
              {people.map((person) => (
                <div
                  key={person.id}
                  className={`oai-people__row ${selectedPeople.includes(person.id) ? 'oai-people__row--selected' : ''}`}
                >
                  <div className="oai-people__row-check">
                    <input
                      type="checkbox"
                      checked={selectedPeople.includes(person.id)}
                      onChange={() => handleTogglePerson(person.id)}
                    />
                  </div>
                  <div className="oai-people__row-avatar">
                    <Avatar initials={person.initials} size="medium" />
                  </div>
                  <div className="oai-people__row-info">
                    <div className="oai-people__row-name">{person.name}</div>
                    <div className="oai-people__row-title">{person.title}</div>
                    <div className="oai-people__row-company">{person.company} &middot; {person.location}</div>
                  </div>
                  <div className="oai-people__row-tags">
                    <Badge label="BULLSEYE" variant="success" size="small" icon={<BullseyeIcon />} />
                    {person.tags.map((tag, i) => (
                      <span key={i} className="oai-people__tag">{tag}</span>
                    ))}
                  </div>
                  <div className="oai-people__row-actions">
                    <button className="oai-people__icon-btn" title="LinkedIn" onClick={fn()}><LinkedInIcon /></button>
                    <button className="oai-people__icon-btn" title="Email" onClick={fn()}><EmailIcon /></button>
                    <button className="oai-people__icon-btn" title="View" onClick={fn()}><ViewIcon /></button>
                    <button className="oai-people__icon-btn" title="Save" onClick={fn()}><SaveIcon /></button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <HelpButton onSubmit={fn()} />
    </PageLayout>
  );
};

export const Default = {
  render: () => <PeoplePage />,
};
