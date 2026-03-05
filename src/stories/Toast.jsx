import PropTypes from 'prop-types';
import './toast.css';

/** Temporary notification message */
export const Toast = ({ message, variant = 'info', action, onAction, onClose }) => {
  return (
    <div className={`oai-toast oai-toast--${variant}`} role="alert" aria-live="polite">
      <span className="oai-toast__message">{message}</span>
      {action && onAction && (
        <button className="oai-toast__action" onClick={onAction}>{action}</button>
      )}
      {onClose && (
        <button className="oai-toast__close" onClick={onClose} aria-label="Dismiss">
          &times;
        </button>
      )}
    </div>
  );
};

Toast.propTypes = {
  /** Toast message text */
  message: PropTypes.string.isRequired,
  /** Semantic color variant */
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  /** Optional action button label */
  action: PropTypes.string,
  /** Action button click handler */
  onAction: PropTypes.func,
  /** Close handler — shows dismiss button when provided */
  onClose: PropTypes.func,
};
