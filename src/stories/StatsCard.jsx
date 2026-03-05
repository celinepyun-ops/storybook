import PropTypes from 'prop-types';
import './statscard.css';

/** Metric display card with trend indicator */
export const StatsCard = ({ title, value, change, trend = 'neutral', icon }) => {
  const arrows = { up: '\u2191', down: '\u2193', neutral: '\u2013' };

  return (
    <div className="oai-stats-card">
      <div className="oai-stats-card__header">
        <p className="oai-stats-card__title">{title}</p>
        {icon && <span className="oai-stats-card__icon">{icon}</span>}
      </div>
      <p className="oai-stats-card__value">{value}</p>
      {change && (
        <span className={`oai-stats-card__change oai-stats-card__change--${trend}`}>
          {arrows[trend]} {change}
        </span>
      )}
    </div>
  );
};

StatsCard.propTypes = {
  /** Metric label */
  title: PropTypes.string.isRequired,
  /** Display value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Change text (e.g. "+12%") */
  change: PropTypes.string,
  /** Trend direction */
  trend: PropTypes.oneOf(['up', 'down', 'neutral']),
  /** Optional icon */
  icon: PropTypes.node,
};
