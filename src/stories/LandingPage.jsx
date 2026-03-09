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

/* Cross-hatch pattern SVG for the visual section */
const CrossHatchPattern = () => (
  <svg className="oai-landing__crosshatch" width="320" height="200" viewBox="0 0 320 200" fill="none" aria-hidden="true">
    {Array.from({ length: 10 }, (_, row) =>
      Array.from({ length: 16 }, (_, col) => (
        <text
          key={`${row}-${col}`}
          x={col * 20 + 10}
          y={row * 20 + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--color-primary-600)"
          fontSize="10"
          opacity="0.5"
        >
          +
        </text>
      ))
    )}
  </svg>
);

/* Network lines SVG — routed around the central horse logo */
const NetworkLines = () => (
  <svg className="oai-landing__network-lines" viewBox="0 0 1200 600" fill="none" aria-hidden="true">
    {/* Left side lines — stop before center */}
    <line x1="80" y1="80" x2="350" y2="200" stroke="var(--color-neutral-200)" strokeWidth="1" />
    <line x1="80" y1="520" x2="350" y2="400" stroke="var(--color-neutral-200)" strokeWidth="1" />
    <line x1="120" y1="300" x2="380" y2="250" stroke="var(--color-neutral-200)" strokeWidth="1" />
    <line x1="120" y1="300" x2="380" y2="350" stroke="var(--color-neutral-200)" strokeWidth="1" />
    <line x1="350" y1="200" x2="380" y2="250" stroke="var(--color-neutral-200)" strokeWidth="1" />
    <line x1="350" y1="400" x2="380" y2="350" stroke="var(--color-neutral-200)" strokeWidth="1" />

    {/* Right side lines — stop before center */}
    <line x1="1120" y1="80" x2="850" y2="200" stroke="var(--color-neutral-200)" strokeWidth="1" />
    <line x1="1120" y1="520" x2="850" y2="400" stroke="var(--color-neutral-200)" strokeWidth="1" />
    <line x1="1080" y1="300" x2="820" y2="250" stroke="var(--color-neutral-200)" strokeWidth="1" />
    <line x1="1080" y1="300" x2="820" y2="350" stroke="var(--color-neutral-200)" strokeWidth="1" />
    <line x1="850" y1="200" x2="820" y2="250" stroke="var(--color-neutral-200)" strokeWidth="1" />
    <line x1="850" y1="400" x2="820" y2="350" stroke="var(--color-neutral-200)" strokeWidth="1" />

    {/* Corner crosses */}
    <text x="80" y="80" textAnchor="middle" dominantBaseline="middle" fill="var(--color-neutral-400)" fontSize="20">+</text>
    <text x="1120" y="80" textAnchor="middle" dominantBaseline="middle" fill="var(--color-neutral-400)" fontSize="20">+</text>

    {/* Node dots on connection points */}
    <rect x="347" y="197" width="6" height="6" fill="var(--color-neutral-300)" rx="1" />
    <rect x="847" y="197" width="6" height="6" fill="var(--color-neutral-300)" rx="1" />
    <rect x="347" y="397" width="6" height="6" fill="var(--color-neutral-300)" rx="1" />
    <rect x="847" y="397" width="6" height="6" fill="var(--color-neutral-300)" rx="1" />
  </svg>
);

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
      <div className="oai-landing__news-badge">
        <span className="oai-landing__news-tag">NEW</span>
        Now live: AI-powered brand recommendations — no setup required.
      </div>
      <h1 className="oai-landing__title">
        The AI Platform{'\n'}for{' '}
        <span className="oai-landing__title-accent">Amazon Brand</span> Outreach
      </h1>
      <div className="oai-landing__hero-actions">
        <button className="oai-landing__hero-btn oai-landing__hero-btn--primary" onClick={onGetStarted}>
          GET STARTED
        </button>
      </div>
    </section>

    {/* Visual section with horse logo, floating pills, network lines */}
    <section className="oai-landing__visual">
      <NetworkLines />

      {/* Floating status pills */}
      <div className="oai-landing__pill oai-landing__pill--left-top">
        <span className="oai-landing__pill-icon oai-landing__pill-icon--red">✕</span>
        BRAND NOT RESPONDING
      </div>
      <div className="oai-landing__pill oai-landing__pill--left-bottom">
        <span className="oai-landing__pill-icon oai-landing__pill-icon--green">✓</span>
        VERIFIED ACROSS NETWORK
      </div>
      <div className="oai-landing__pill oai-landing__pill--right">
        <span className="oai-landing__pill-icon oai-landing__pill-icon--green">✓</span>
        12 BRANDS DISCOVERED
      </div>

      {/* Central horse logo */}
      <div className="oai-landing__visual-logo">
        {Icons.logo(320)}
      </div>

      {/* Cross-hatch pattern bottom */}
      <div className="oai-landing__crosshatch-wrap oai-landing__crosshatch-wrap--left">
        <CrossHatchPattern />
      </div>
      <div className="oai-landing__crosshatch-wrap oai-landing__crosshatch-wrap--right">
        <CrossHatchPattern />
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
