import PropTypes from 'prop-types';
import './breadcrumbs.css';

/** Navigation breadcrumb trail */
export const Breadcrumbs = ({ items = [], separator = '/' }) => {
  return (
    <nav className="oai-breadcrumbs" aria-label="Breadcrumb">
      <ol className="oai-breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="oai-breadcrumbs__item">
              {isLast ? (
                <span className="oai-breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <a className="oai-breadcrumbs__link" href={item.href || '#'}>
                    {item.label}
                  </a>
                  <span className="oai-breadcrumbs__separator" aria-hidden="true">
                    {separator}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  /** Array of breadcrumb items */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
  /** Separator character between items */
  separator: PropTypes.string,
};
