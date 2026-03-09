import PropTypes from 'prop-types';
import { MarketingNavbar } from './MarketingNavbar';
import { Icons } from './icons';
import './landing.css';

const features = [
  {
    icon: Icons.search,
    title: 'Brand Discovery',
    desc: 'Search and discover top-selling Amazon brands across every category. Filter by ratings, revenue, and growth.',
  },
  {
    icon: Icons.sparkle,
    title: 'AI Recommendations',
    desc: 'Let AI analyze brands and recommend the ones most likely to need your services, saving hours of research.',
  },
  {
    icon: Icons.campaigns,
    title: 'Email Campaigns',
    desc: 'Craft personalized outreach sequences and track responses with built-in email campaign management.',
  },
  {
    icon: Icons.analytics,
    title: 'Performance Analytics',
    desc: 'Monitor response rates, track campaign performance, and identify what messaging resonates best.',
  },
  {
    icon: Icons.contacts,
    title: 'Contact Management',
    desc: 'Organize brand contacts, track outreach history, and manage your pipeline from discovery to deal.',
  },
  {
    icon: Icons.templates,
    title: 'Smart Templates',
    desc: 'Use proven outreach templates or create your own. AI optimizes subject lines and messaging for higher response rates.',
  },
];

export const LandingPage = ({ onNavigate, onSignIn, onGetStarted }) => (
  <div className="oai-landing">
    <MarketingNavbar
      activePage="landing"
      onNavigate={onNavigate}
      onSignIn={onSignIn}
      onGetStarted={onGetStarted}
    />

    {/* Hero */}
    <section className="oai-landing__hero">
      <div className="oai-landing__badge">
        {Icons.sparkle}
        AI-Powered Outreach for Amazon Brands
      </div>
      <h1 className="oai-landing__title">
        Find, Reach, and Close{' '}
        <span className="oai-landing__title-accent">Amazon Brand</span> Deals Faster
      </h1>
      <p className="oai-landing__subtitle">
        Discover top-selling Amazon brands, craft personalized outreach, and manage your pipeline — all powered by AI.
      </p>
      <div className="oai-landing__hero-actions">
        <button className="oai-landing__hero-btn oai-landing__hero-btn--primary" onClick={onGetStarted}>
          Start Free Trial
        </button>
        <button className="oai-landing__hero-btn oai-landing__hero-btn--secondary" onClick={() => onNavigate?.('product')}>
          See How It Works
        </button>
      </div>
    </section>

    {/* Stats */}
    <section className="oai-landing__stats">
      <div className="oai-landing__stat">
        <span className="oai-landing__stat-value">50K+</span>
        <span className="oai-landing__stat-label">Brands Discovered</span>
      </div>
      <div className="oai-landing__stat">
        <span className="oai-landing__stat-value">32%</span>
        <span className="oai-landing__stat-label">Avg Response Rate</span>
      </div>
      <div className="oai-landing__stat">
        <span className="oai-landing__stat-value">2.5x</span>
        <span className="oai-landing__stat-label">Faster Outreach</span>
      </div>
      <div className="oai-landing__stat">
        <span className="oai-landing__stat-value">1,200+</span>
        <span className="oai-landing__stat-label">Active Users</span>
      </div>
    </section>

    {/* Features */}
    <section className="oai-landing__features">
      <div className="oai-landing__features-header">
        <p className="oai-landing__features-label">Features</p>
        <h2 className="oai-landing__features-title">Everything you need for brand outreach</h2>
        <p className="oai-landing__features-desc">
          From discovery to deal close, Outreach AI streamlines your entire workflow.
        </p>
      </div>
      <div className="oai-landing__features-grid">
        {features.map((f) => (
          <div className="oai-landing__feature-card" key={f.title}>
            <div className="oai-landing__feature-icon">{f.icon}</div>
            <h3 className="oai-landing__feature-title">{f.title}</h3>
            <p className="oai-landing__feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="oai-landing__cta">
      <div className="oai-landing__cta-inner">
        <h2 className="oai-landing__cta-title">Ready to grow your brand partnerships?</h2>
        <p className="oai-landing__cta-desc">
          Join 1,200+ agencies and freelancers using Outreach AI to discover and connect with Amazon brands.
        </p>
        <button className="oai-landing__cta-btn" onClick={onGetStarted}>
          Get Started — It's Free
        </button>
      </div>
    </section>

    {/* Footer */}
    <footer className="oai-landing__footer">
      <div className="oai-landing__footer-brand">
        <span className="oai-landing__footer-logo">{Icons.logo(20)}</span>
        <span className="oai-landing__footer-name">Outreach AI</span>
      </div>
      <span className="oai-landing__footer-copy">&copy; 2026 Outreach AI. All rights reserved.</span>
    </footer>
  </div>
);

LandingPage.propTypes = {
  onNavigate: PropTypes.func,
  onSignIn: PropTypes.func,
  onGetStarted: PropTypes.func,
};
