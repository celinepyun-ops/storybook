import PropTypes from 'prop-types';
import './navbar.css';

/** Top application navigation bar */
export const Navbar = ({ children, actions }) => {
  return (
    <header className="oai-navbar" role="banner">
      {children && <div className="oai-navbar__center">{children}</div>}
      {actions && <div className="oai-navbar__actions">{actions}</div>}
    </header>
  );
};

Navbar.propTypes = {
  /** Center content (e.g. Search) */
  children: PropTypes.node,
  /** Right-side action elements */
  actions: PropTypes.node,
};
