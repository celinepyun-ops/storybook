import PropTypes from 'prop-types';
import { Spinner } from './Spinner';
import './search.css';

/** Search input with icon, clear button, and loading state */
export const Search = ({ value = '', onChange, placeholder = 'Search...', onClear, loading = false }) => {
  return (
    <div className="oai-search" role="search">
      <span className="oai-search__icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        className="oai-search__input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      {loading && (
        <span className="oai-search__spinner">
          <Spinner size="sm" />
        </span>
      )}
      {value && onClear && !loading && (
        <button className="oai-search__clear" onClick={onClear} aria-label="Clear search">
          &times;
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  /** Current search value */
  value: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Clear handler — shows clear button when value is non-empty */
  onClear: PropTypes.func,
  /** Show loading spinner */
  loading: PropTypes.bool,
};
