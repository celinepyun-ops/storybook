import { useRef } from 'react';
import PropTypes from 'prop-types';
import './tabs.css';

/** Tabbed navigation with keyboard support */
export const Tabs = ({ tabs = [], activeTab, onTabChange, variant = 'underline' }) => {
  const listRef = useRef(null);

  const handleKeyDown = (e) => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    let nextIndex;

    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else {
      return;
    }

    e.preventDefault();
    onTabChange?.(tabs[nextIndex].id);
    listRef.current?.querySelectorAll('[role="tab"]')[nextIndex]?.focus();
  };

  return (
    <div className="oai-tabs">
      <div
        className={`oai-tabs__list oai-tabs__list--${variant}`}
        role="tablist"
        ref={listRef}
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            className={`oai-tabs__tab ${activeTab === tab.id ? 'oai-tabs__tab--active' : ''}`}
            aria-selected={activeTab === tab.id}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => onTabChange?.(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  /** Array of tab objects with id and label */
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  /** Currently active tab id */
  activeTab: PropTypes.string,
  /** Tab change handler */
  onTabChange: PropTypes.func,
  /** Visual variant */
  variant: PropTypes.oneOf(['underline', 'pill']),
};
