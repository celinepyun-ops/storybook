import PropTypes from 'prop-types';
import './avatar.css';

export const Avatar = ({ src, initials, size = 'medium' }) => {
  return (
    <div className={`avatar avatar--${size}`}>
      {src ? (
        <img className="avatar__image" src={src} alt={initials || 'avatar'} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  initials: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};
