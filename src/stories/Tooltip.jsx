import { useState } from 'react';
import PropTypes from 'prop-types';
import './tooltip.css';

/** Hover-triggered contextual information popup */
export const Tooltip = ({ text, position = 'top', children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="oai-tooltip"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div className="oai-tooltip__trigger">{children}</div>
      {visible && (
        <div className={`oai-tooltip__content oai-tooltip__content--${position}`} role="tooltip">
          {text}
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  /** Tooltip text content */
  text: PropTypes.string.isRequired,
  /** Position relative to trigger */
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  /** Trigger element */
  children: PropTypes.node.isRequired,
};
