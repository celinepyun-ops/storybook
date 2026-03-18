import PropTypes from 'prop-types';
import { MarketingNavbar } from './MarketingNavbar';
import { Icons } from './icons';
import './pricing.css';

const Check = () => (
  <span className="oai-pricing__check">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

const plans = [
  {
    name: 'Starter',
    desc: 'For individuals getting started with product outreach.',
    price: 'Free',
    period: '',
    btnLabel: 'Get Started',
    btnStyle: 'outline',
    features: [
      'Up to 50 product searches / month',
      'Basic product discovery filters',
      'Email template library',
      '1 campaign at a time',
      'Community support',
    ],
  },
  {
    name: 'Standard',
    desc: 'For growing agencies that need more power and automation.',
    price: '$49',
    period: '/ month',
    btnLabel: 'Start Free Trial',
    btnStyle: 'primary',
    featured: true,
    features: [
      'Unlimited product searches',
      'AI-powered recommendations',
      'Advanced filters & analytics',
      'Up to 10 active campaigns',
      'Email tracking & response rates',
      'Priority email support',
    ],
  },
  {
    name: 'Enterprise',
    desc: 'For large teams needing custom integrations and support.',
    price: '$149',
    period: '/ month',
    btnLabel: 'Contact Sales',
    btnStyle: 'outline',
    features: [
      'Everything in Standard',
      'Unlimited campaigns',
      'Team collaboration & roles',
      'Custom API integrations',
      'Dedicated account manager',
      'SSO & advanced security',
    ],
  },
];

export const PricingPage = ({ onNavigate, onSignIn, onGetStarted }) => (
  <div className="oai-pricing">
    <MarketingNavbar
      activePage="pricing"
      onNavigate={onNavigate}
      onSignIn={onSignIn}
      onGetStarted={onGetStarted}
    />

    {/* Header */}
    <div className="oai-pricing__header">
      <p className="oai-pricing__label">Pricing</p>
      <h1 className="oai-pricing__title">Simple, transparent pricing</h1>
      <p className="oai-pricing__subtitle">
        Start free and scale as you grow. No hidden fees, cancel anytime.
      </p>
    </div>

    {/* Cards */}
    <div className="oai-pricing__grid">
      {plans.map((plan) => (
        <div
          className={`oai-pricing__card ${plan.featured ? 'oai-pricing__card--featured' : ''}`}
          key={plan.name}
        >
          <h2 className="oai-pricing__plan-name">{plan.name}</h2>
          <p className="oai-pricing__plan-desc">{plan.desc}</p>

          <div className="oai-pricing__price-row">
            <span className="oai-pricing__price">{plan.price}</span>
            {plan.period && <span className="oai-pricing__period">{plan.period}</span>}
          </div>

          <button
            className={`oai-pricing__card-btn oai-pricing__card-btn--${plan.btnStyle}`}
            onClick={onGetStarted}
          >
            {plan.btnLabel}
          </button>

          <ul className="oai-pricing__features">
            {plan.features.map((f) => (
              <li className="oai-pricing__feature" key={f}>
                <Check />
                {f}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Footer */}
    <footer className="oai-pricing__footer">
      <div className="oai-pricing__footer-brand">
        <span className="oai-pricing__footer-logo">{Icons.logo(20)}</span>
        <span className="oai-pricing__footer-name">Gallop AI</span>
      </div>
      <span className="oai-pricing__footer-copy">&copy; 2026 Gallop AI. All rights reserved.</span>
    </footer>
  </div>
);

PricingPage.propTypes = {
  onNavigate: PropTypes.func,
  onSignIn: PropTypes.func,
  onGetStarted: PropTypes.func,
};
