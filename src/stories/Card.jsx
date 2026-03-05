import PropTypes from 'prop-types';
import './card.css';

/** Container for grouping related content */
export const Card = ({ title, description, image, variant = 'default' }) => {
  return (
    <div className={`oai-card oai-card--${variant}`}>
      {image && <img className="oai-card__image" src={image} alt={title} />}
      <h2 className="oai-card__title">{title}</h2>
      <p className="oai-card__description">{description}</p>
    </div>
  );
};

Card.propTypes = {
  /** Card heading */
  title: PropTypes.string.isRequired,
  /** Card body text */
  description: PropTypes.string.isRequired,
  /** Optional image URL */
  image: PropTypes.string,
  /** Visual style variant */
  variant: PropTypes.oneOf(['default', 'elevated']),
};
