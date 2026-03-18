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

const TokenIcon = () => (
  <svg className="oai-pricing__token-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v12M8 10l4-4 4 4M8 14l4 4 4-4" />
  </svg>
);

const packages = [
  {
    name: 'Starter Pack',
    tokens: '100',
    price: '$29',
    bestFor: 'Trying out the platform',
    btnLabel: 'Get Started',
    includes: [
      'Product search (unlimited)',
      'Contact availability check (free)',
      '100 contact reveals',
    ],
  },
  {
    name: 'Growth Pack',
    tokens: '500',
    price: '$99',
    bestFor: 'Active prospecting',
    btnLabel: 'Get Started',
    featured: true,
    saveBadge: 'Save 30%',
    includes: [
      'Everything in Starter',
      '500 contact reveals',
      'Priority support',
    ],
  },
];

const commonFeatures = [
  'Unlimited product search',
  'AI seller analysis',
  'List management',
  'Email queue',
  'Dark mode',
];

const faqs = [
  {
    question: 'What are tokens?',
    answer: 'Tokens are credits used to reveal contact information such as email addresses and LinkedIn profiles. Each reveal costs a set number of tokens depending on the type of contact data.',
  },
  {
    question: 'Do tokens expire?',
    answer: 'No, tokens never expire. Once purchased, they remain in your account until you use them. Buy at your own pace and reveal contacts when you need them.',
  },
  {
    question: 'Can I buy more tokens anytime?',
    answer: 'Yes! You can purchase additional token packages at any time from the Pricing page or directly from your Settings. There are no limits on how many packages you can buy.',
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
      <h1 className="oai-pricing__title">Simple Token Pricing</h1>
      <p className="oai-pricing__subtitle">
        Pay only for what you use. Buy tokens to reveal contact information — no subscriptions, no hidden fees.
      </p>
    </div>

    {/* Token Package Cards */}
    <div className="oai-pricing__grid">
      {packages.map((pkg) => (
        <div
          className={`oai-pricing__card ${pkg.featured ? 'oai-pricing__card--featured' : ''}`}
          key={pkg.name}
        >
          {pkg.saveBadge && (
            <span className="oai-pricing__save-badge">{pkg.saveBadge}</span>
          )}

          <h2 className="oai-pricing__plan-name">{pkg.name}</h2>

          <div className="oai-pricing__token-row">
            <TokenIcon />
            <span className="oai-pricing__token-count">{pkg.tokens} tokens</span>
          </div>

          <div className="oai-pricing__price-row">
            <span className="oai-pricing__price">{pkg.price}</span>
          </div>

          <p className="oai-pricing__best-for">
            Best for: <strong>{pkg.bestFor}</strong>
          </p>

          <button
            className={`oai-pricing__card-btn oai-pricing__card-btn--${pkg.featured ? 'primary' : 'outline'}`}
            onClick={onGetStarted}
          >
            {pkg.btnLabel}
          </button>

          <div className="oai-pricing__includes-label">Includes:</div>
          <ul className="oai-pricing__features">
            {pkg.includes.map((f) => (
              <li className="oai-pricing__feature" key={f}>
                <Check />
                {f}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Common Features */}
    <div className="oai-pricing__common">
      <h3 className="oai-pricing__common-title">All plans include</h3>
      <div className="oai-pricing__common-list">
        {commonFeatures.map((f) => (
          <span className="oai-pricing__common-item" key={f}>
            <Check />
            {f}
          </span>
        ))}
      </div>
    </div>

    {/* FAQ */}
    <div className="oai-pricing__faq">
      <h2 className="oai-pricing__faq-title">Frequently Asked Questions</h2>
      <div className="oai-pricing__faq-list">
        {faqs.map((faq) => (
          <div className="oai-pricing__faq-item" key={faq.question}>
            <h3 className="oai-pricing__faq-question">{faq.question}</h3>
            <p className="oai-pricing__faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
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
