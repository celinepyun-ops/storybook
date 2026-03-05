import PropTypes from 'prop-types';
import './badge.css';

/** Status indicator label */
export const Badge = ({ label, variant = 'info', size = 'medium' }) => {
  return (
    <span className={`oai-badge oai-badge--${variant} oai-badge--${size}`}>
      {label}
    </span>
  );
};

Badge.propTypes = {
  /** Badge text */
  label: PropTypes.string.isRequired,
  /** Semantic color variant */
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  /** Badge size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};
