import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from './Button';
import './helpbutton.css';

/** Floating help button with support inquiry card form */
export const HelpButton = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ name, email, message });
    setName('');
    setEmail('');
    setMessage('');
    setOpen(false);
  };

  return (
    <div className="oai-help" ref={ref}>
      {open && (
        <div className="oai-help-card">
          <div className="oai-help-card__header">
            <h3 className="oai-help-card__title">Need Help?</h3>
            <button
              className="oai-help-card__close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <p className="oai-help-card__desc">
            Send us a message and we'll get back to you shortly.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="oai-help-card__field">
              <label className="oai-help-card__label" htmlFor="help-name">Name</label>
              <input
                className="oai-help-card__input"
                id="help-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="oai-help-card__field">
              <label className="oai-help-card__label" htmlFor="help-email">Email</label>
              <input
                className="oai-help-card__input"
                id="help-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="oai-help-card__field">
              <label className="oai-help-card__label" htmlFor="help-message">Message</label>
              <textarea
                className="oai-help-card__textarea"
                id="help-message"
                placeholder="How can we help?"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <div className="oai-help-card__actions">
              <Button variant="primary" size="medium" label="Send Message" type="submit" />
            </div>
          </form>
        </div>
      )}
      <button
        className="oai-help-btn"
        onClick={() => setOpen(!open)}
        aria-label="Help & Support"
      >
        ?
      </button>
    </div>
  );
};

HelpButton.propTypes = {
  /** Callback when the form is submitted */
  onSubmit: PropTypes.func,
};
