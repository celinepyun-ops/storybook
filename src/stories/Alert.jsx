import PropTypes from 'prop-types';
import './alert.css';

/** Contextual feedback messages for user actions */
export const Alert = ({ title, message, variant = 'info', onClose }) => {
  return (
    <div className={`oai-alert oai-alert--${variant}`} role="alert">
      <div>
        {title && <p className="oai-alert__title">{title}</p>}
        <p className="oai-alert__message">{message}</p>
      </div>
      {onClose && (
        <button className="oai-alert__close" onClick={onClose} aria-label="Close">
          &times;
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  /** Optional alert heading */
  title: PropTypes.string,
  /** Alert body text */
  message: PropTypes.string.isRequired,
  /** Semantic color variant */
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  /** Close handler — shows close button when provided */
  onClose: PropTypes.func,
};
