import PropTypes from 'prop-types';
import './pagelayout.css';

/** Full-page layout composing sidebar, navbar, and content */
export const PageLayout = ({ sidebar, navbar, children }) => {
  return (
    <div className="oai-page-layout">
      {sidebar}
      <div className="oai-page-layout__main">
        {navbar}
        <main className="oai-page-layout__content">
          {children}
        </main>
      </div>
    </div>
  );
};

PageLayout.propTypes = {
  /** Sidebar element */
  sidebar: PropTypes.node,
  /** Navbar element */
  navbar: PropTypes.node,
  /** Main content */
  children: PropTypes.node,
};
