import PropTypes from 'prop-types';
import './emptystate.css';

/** Placeholder for empty content areas */
export const EmptyState = ({ icon, title, description, action }) => {
  return (
    <div className="oai-empty-state" role="status">
      {icon && <div className="oai-empty-state__icon">{icon}</div>}
      <h3 className="oai-empty-state__title">{title}</h3>
      {description && <p className="oai-empty-state__description">{description}</p>}
      {action && <div className="oai-empty-state__action">{action}</div>}
    </div>
  );
};

EmptyState.propTypes = {
  /** Icon or emoji to display */
  icon: PropTypes.node,
  /** Heading text */
  title: PropTypes.string.isRequired,
  /** Supporting description */
  description: PropTypes.string,
  /** Action element (e.g. a Button) */
  action: PropTypes.node,
};
