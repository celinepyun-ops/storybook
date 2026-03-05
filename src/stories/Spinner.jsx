import PropTypes from 'prop-types';
import './spinner.css';

/** Loading indicator spinner */
export const Spinner = ({ size = 'md', label }) => {
  return (
    <div className="oai-spinner" role="status">
      <div className={`oai-spinner__circle oai-spinner__circle--${size}`} />
      {label && <span className="oai-spinner__label">{label}</span>}
      {!label && <span className="oai-spinner__label" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Loading</span>}
    </div>
  );
};

Spinner.propTypes = {
  /** Spinner size */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Optional visible label */
  label: PropTypes.string,
};
