import PropTypes from 'prop-types';
import { Icons } from './icons';
import './marketingnavbar.css';

export const MarketingNavbar = ({ activePage, onNavigate, onSignIn, onGetStarted }) => (
  <header className="oai-mktg-header">
    <nav className="oai-mktg-nav">
      <button className="oai-mktg-nav__logo" onClick={() => onNavigate?.('landing')}>
        <span className="oai-mktg-nav__logo-mark">{Icons.logo(28)}</span>
        <span className="oai-mktg-nav__logo-text">Gallop AI</span>
      </button>

      <div className="oai-mktg-nav__links">
        <button
          className={`oai-mktg-nav__link ${activePage === 'product' ? 'oai-mktg-nav__link--active' : ''}`}
          onClick={() => onNavigate?.('product')}
        >
          Product
        </button>
        <button
          className={`oai-mktg-nav__link ${activePage === 'pricing' ? 'oai-mktg-nav__link--active' : ''}`}
          onClick={() => onNavigate?.('pricing')}
        >
          Pricing
        </button>
      </div>

      <div className="oai-mktg-nav__actions">
        <button className="oai-mktg-nav__signin" onClick={onSignIn}>
          Sign In
        </button>
        <button className="oai-mktg-nav__cta" onClick={onGetStarted}>
          Get Started
        </button>
      </div>
    </nav>
  </header>
);

MarketingNavbar.propTypes = {
  activePage: PropTypes.oneOf(['landing', 'product', 'pricing']),
  onNavigate: PropTypes.func,
  onSignIn: PropTypes.func,
  onGetStarted: PropTypes.func,
};
