import PropTypes from 'prop-types';
import './navbar.css';

/** Top application navigation bar */
export const Navbar = ({ brand, children, actions }) => {
  return (
    <header className="oai-navbar" role="banner">
      <div className="oai-navbar__brand">
        <svg className="oai-navbar__brand-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <path d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z" fill="#F4F6EC" />
            <path d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z" fill="#6B7A2F" />
            <path d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z" fill="#ADBD6E" />
          </g>
        </svg>
        {brand || 'Outreach AI'}
      </div>
      {children && <div className="oai-navbar__center">{children}</div>}
      {actions && <div className="oai-navbar__actions">{actions}</div>}
    </header>
  );
};

Navbar.propTypes = {
  /** Brand name or logo element */
  brand: PropTypes.node,
  /** Center content (e.g. Search) */
  children: PropTypes.node,
  /** Right-side action elements */
  actions: PropTypes.node,
};
