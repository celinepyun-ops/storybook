import PropTypes from 'prop-types';
import { MarketingNavbar } from './MarketingNavbar';
import { Icons } from './icons';
import './product.css';

const Check = () => (
  <span className="oai-product__section-check">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

const sections = [
  {
    icon: Icons.search,
    title: 'Discover Amazon Brands',
    desc: 'Search across millions of Amazon listings to find brands by category, rating, revenue, and growth trajectory. Our database updates daily.',
    items: [
      'Search by keyword, category, or ASIN',
      'Filter by revenue, rating, and review count',
      'Daily data updates from Amazon',
    ],
    visualIcon: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
    visualLabel: 'Brand Discovery',
  },
  {
    icon: Icons.sparkle,
    title: 'AI-Powered Insights',
    desc: 'Let our AI analyze brand profiles and recommend the ones most likely to convert. Save hours of manual research with intelligent scoring.',
    items: [
      'AI brand scoring and ranking',
      'Contact information enrichment',
      'Competitive landscape analysis',
    ],
    visualIcon: <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />,
    visualLabel: 'AI Analysis',
    reverse: true,
  },
  {
    icon: Icons.campaigns,
    title: 'Automated Outreach Campaigns',
    desc: 'Create personalized email sequences, schedule follow-ups, and track every interaction. Multi-step campaigns run on autopilot.',
    items: [
      'Drag-and-drop campaign builder',
      'Personalized email merge fields',
      'Automated follow-up sequences',
    ],
    visualIcon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
    visualLabel: 'Campaign Builder',
  },
  {
    icon: Icons.analytics,
    title: 'Real-Time Analytics',
    desc: 'Monitor campaign performance with detailed dashboards. Track open rates, response rates, and conversion metrics in real time.',
    items: [
      'Live campaign dashboards',
      'Response rate tracking',
      'Exportable reports and insights',
    ],
    visualIcon: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>,
    visualLabel: 'Analytics Dashboard',
    reverse: true,
  },
];

export const ProductPage = ({ onNavigate, onSignIn, onGetStarted }) => (
  <div className="oai-product">
    <MarketingNavbar
      activePage="product"
      onNavigate={onNavigate}
      onSignIn={onSignIn}
      onGetStarted={onGetStarted}
    />

    {/* Hero */}
    <section className="oai-product__hero">
      <p className="oai-product__label">Product</p>
      <h1 className="oai-product__title">The complete platform for Amazon brand outreach</h1>
      <p className="oai-product__subtitle">
        From brand discovery to deal close, every tool you need in one place.
      </p>
    </section>

    {/* Feature Sections */}
    <div className="oai-product__sections">
      {sections.map((s) => (
        <section
          className={`oai-product__section ${s.reverse ? 'oai-product__section--reverse' : ''}`}
          key={s.title}
        >
          <div className="oai-product__section-content">
            <div className="oai-product__section-icon">{s.icon}</div>
            <h2 className="oai-product__section-title">{s.title}</h2>
            <p className="oai-product__section-desc">{s.desc}</p>
            <ul className="oai-product__section-list">
              {s.items.map((item) => (
                <li className="oai-product__section-list-item" key={item}>
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="oai-product__visual">
            <div className="oai-product__visual-inner">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                {s.visualIcon}
              </svg>
              <span className="oai-product__visual-label">{s.visualLabel}</span>
            </div>
          </div>
        </section>
      ))}
    </div>

    {/* CTA */}
    <section className="oai-product__cta">
      <div className="oai-product__cta-inner">
        <h2 className="oai-product__cta-title">Start reaching brands today</h2>
        <p className="oai-product__cta-desc">
          Sign up for free and discover why 1,200+ agencies trust Outreach AI for their brand partnerships.
        </p>
        <button className="oai-product__cta-btn" onClick={onGetStarted}>
          Get Started — It's Free
        </button>
      </div>
    </section>

    {/* Footer */}
    <footer className="oai-product__footer">
      <div className="oai-product__footer-brand">
        <span className="oai-product__footer-logo">{Icons.logo(20)}</span>
        <span className="oai-product__footer-name">Outreach AI</span>
      </div>
      <span className="oai-product__footer-copy">&copy; 2026 Outreach AI. All rights reserved.</span>
    </footer>
  </div>
);

ProductPage.propTypes = {
  onNavigate: PropTypes.func,
  onSignIn: PropTypes.func,
  onGetStarted: PropTypes.func,
};
