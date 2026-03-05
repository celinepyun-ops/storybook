import PropTypes from 'prop-types';
import './avatar.css';

/** User profile image or initials */
export const Avatar = ({ src, initials, size = 'medium' }) => {
  return (
    <div className={`oai-avatar oai-avatar--${size}`}>
      {src ? (
        <img className="oai-avatar__image" src={src} alt={initials || 'avatar'} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

Avatar.propTypes = {
  /** Image URL */
  src: PropTypes.string,
  /** Fallback initials when no image */
  initials: PropTypes.string,
  /** Avatar size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};
