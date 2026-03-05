import PropTypes from 'prop-types';
import './input.css';

export const Input = ({ label, placeholder, helperText, error, disabled, onChange }) => {
  const inputClass = [
    'input',
    error && 'input--error',
    disabled && 'input--disabled',
  ].filter(Boolean).join(' ');

  return (
    <div className="input-wrapper">
      {label && <label className="input__label">{label}</label>}
      <input
        className={inputClass}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
      {helperText && (
        <span className={`input__helper ${error ? 'input__helper--error' : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
