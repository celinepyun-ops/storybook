import PropTypes from 'prop-types';
import './card.css';

export const Card = ({ title, description, image, variant = 'primary' }) => {
  return (
    <div className={`card card--${variant}`}>
      {image && <img className="card__image" src={image} alt={title} />}
      <h2 className="card__title">{title}</h2>
      <p className="card__description">{description}</p>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'dark']),
};
