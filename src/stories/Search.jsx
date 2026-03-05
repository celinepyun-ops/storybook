import PropTypes from 'prop-types';
import { Spinner } from './Spinner';
import './search.css';

/** Search input with icon, clear button, and loading state */
export const Search = ({ value = '', onChange, placeholder = 'Search...', onClear, loading = false }) => {
  return (
    <div className="oai-search" role="search">
      <span className="oai-search__icon" aria-hidden="true">&#128269;</span>
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
