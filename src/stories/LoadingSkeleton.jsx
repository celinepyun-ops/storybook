import PropTypes from 'prop-types';
import './loadingskeleton.css';

/** Placeholder loading animation */
export const LoadingSkeleton = ({ variant = 'text', width, height, lines = 1 }) => {
  const style = {
    width: width || (variant === 'circle' ? '48px' : '100%'),
    height: height || (variant === 'circle' ? '48px' : undefined),
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="oai-skeleton__lines" role="status" aria-label="Loading">
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className="oai-skeleton oai-skeleton--text" style={style} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`oai-skeleton oai-skeleton--${variant}`}
      style={style}
      role="status"
      aria-label="Loading"
    />
  );
};

LoadingSkeleton.propTypes = {
  /** Shape variant */
  variant: PropTypes.oneOf(['text', 'circle', 'rectangle', 'card']),
  /** Custom width */
  width: PropTypes.string,
  /** Custom height */
  height: PropTypes.string,
  /** Number of text lines (text variant only) */
  lines: PropTypes.number,
};
