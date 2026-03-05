import { useState } from 'react';
import PropTypes from 'prop-types';
import './tooltip.css';

export const Tooltip = ({ text, position = 'top', children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div className="tooltip__trigger">{children}</div>
      {visible && (
        <div className={`tooltip__content tooltip__content--${position}`}>
          {text}
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  children: PropTypes.node.isRequired,
};
