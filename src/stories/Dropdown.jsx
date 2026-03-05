import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './dropdown.css';

/** Accessible dropdown menu with keyboard navigation */
export const Dropdown = ({ trigger, items = [], align = 'left' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!open) return;
    const btns = menuRef.current?.querySelectorAll('[role="menuitem"]');
    if (!btns?.length) return;

    const active = document.activeElement;
    const idx = Array.from(btns).indexOf(active);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      btns[(idx + 1) % btns.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      btns[(idx - 1 + btns.length) % btns.length]?.focus();
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      menuRef.current?.querySelector('[role="menuitem"]')?.focus();
    }
  }, [open]);

  return (
    <div className="oai-dropdown" ref={ref} onKeyDown={handleKeyDown}>
      <div className="oai-dropdown__trigger" onClick={() => setOpen(!open)}>
        {trigger}
      </div>
      {open && (
        <ul className={`oai-dropdown__menu oai-dropdown__menu--${align}`} role="menu" ref={menuRef}>
          {items.map((item, i) =>
            item.divider ? (
              <li key={i} className="oai-dropdown__divider" role="separator" />
            ) : (
              <li key={i}>
                <button
                  className={`oai-dropdown__item ${item.danger ? 'oai-dropdown__item--danger' : ''}`}
                  role="menuitem"
                  onClick={() => {
                    item.onClick?.();
                    setOpen(false);
                  }}
                >
                  {item.icon && <span>{item.icon}</span>}
                  {item.label}
                </button>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  /** Trigger element */
  trigger: PropTypes.node.isRequired,
  /** Menu items */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.node,
      onClick: PropTypes.func,
      danger: PropTypes.bool,
      divider: PropTypes.bool,
    })
  ).isRequired,
  /** Menu alignment */
  align: PropTypes.oneOf(['left', 'right']),
};
