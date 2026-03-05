import PropTypes from 'prop-types';
import './input.css';

/** Text input field with label and helper text */
export const Input = ({ label, placeholder, helperText, error, disabled, type = 'text', name, value, onChange }) => {
  const inputClass = [
    'oai-input',
    error && 'oai-input--error',
    disabled && 'oai-input--disabled',
  ].filter(Boolean).join(' ');

  return (
    <div className="oai-input-wrapper">
      {label && <label className="oai-input__label">{label}</label>}
      <input
        className={inputClass}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        aria-invalid={error || undefined}
      />
      {helperText && (
        <span className={`oai-input__helper ${error ? 'oai-input__helper--error' : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  /** Label text */
  label: PropTypes.string,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Helper text below the input */
  helperText: PropTypes.string,
  /** Whether the input has an error */
  error: PropTypes.bool,
  /** Whether the input is disabled */
  disabled: PropTypes.bool,
  /** Input type */
  type: PropTypes.string,
  /** Input name attribute */
  name: PropTypes.string,
  /** Controlled value */
  value: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
};
