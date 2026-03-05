import PropTypes from 'prop-types';
import './alert.css';

export const Alert = ({ title, message, variant = 'info', onClose }) => {
  return (
    <div className={`alert alert--${variant}`}>
      <div>
        {title && <p className="alert__title">{title}</p>}
        <p className="alert__message">{message}</p>
      </div>
      {onClose && (
        <button className="alert__close" onClick={onClose} aria-label="Close">
          &times;
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  onClose: PropTypes.func,
};
