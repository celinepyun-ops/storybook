import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './modal.css';

/** Dialog overlay with focus trap and Escape to close */
export const Modal = ({ isOpen = false, onClose, title, size = 'md', children, footer }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose?.();

      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    modalRef.current?.querySelector('button')?.focus();
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="oai-modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div
        className={`oai-modal oai-modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={modalRef}
      >
        <div className="oai-modal__header">
          <h2 className="oai-modal__title">{title}</h2>
          <button className="oai-modal__close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="oai-modal__body">{children}</div>
        {footer && <div className="oai-modal__footer">{footer}</div>}
      </div>
    </div>
  );
};

Modal.propTypes = {
  /** Whether the modal is visible */
  isOpen: PropTypes.bool,
  /** Close handler */
  onClose: PropTypes.func,
  /** Modal title */
  title: PropTypes.string,
  /** Modal width */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Modal body content */
  children: PropTypes.node,
  /** Footer content (usually buttons) */
  footer: PropTypes.node,
};
