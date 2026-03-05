import PropTypes from 'prop-types';
import './badge.css';

export const Badge = ({ label, variant = 'info', size = 'medium' }) => {
  return (
    <span className={`badge badge--${variant} badge--${size}`}>
      {label}
    </span>
  );
};

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};
