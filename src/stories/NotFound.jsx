import PropTypes from 'prop-types';
import { Button } from './Button';
import './notfound.css';

/** 404 Page Not Found */
export const NotFound = ({ onBackClick }) => {
  return (
    <div className="oai-notfound">
      <main className="oai-notfound__body">
        <span className="oai-notfound__cross oai-notfound__cross--left">+</span>

        <div className="oai-notfound__content">
          <div className="oai-notfound__digits" aria-hidden="true">
            <span className="oai-notfound__digit">4</span>
            <span className="oai-notfound__digit">0</span>
            <span className="oai-notfound__digit">4</span>
          </div>
          <p className="oai-notfound__message">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="oai-notfound__action">
            <Button
              variant="primary"
              size="large"
              label="BACK TO DASHBOARD"
              onClick={onBackClick}
            />
          </div>
        </div>

        <span className="oai-notfound__cross oai-notfound__cross--right">+</span>
      </main>
    </div>
  );
};

NotFound.propTypes = {
  /** Callback when "Back to Dashboard" is clicked */
  onBackClick: PropTypes.func,
};
