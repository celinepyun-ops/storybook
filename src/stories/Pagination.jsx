import PropTypes from 'prop-types';
import './pagination.css';

/** Page navigation with numbered buttons */
export const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange, siblingCount = 1 }) => {
  const range = (start, end) => {
    const result = [];
    for (let i = start; i <= end; i++) result.push(i);
    return result;
  };

  const buildPages = () => {
    const totalNumbers = siblingCount * 2 + 3; // siblings + first + last + current
    if (totalPages <= totalNumbers + 2) return range(1, totalPages);

    const leftSibling = Math.max(currentPage - siblingCount, 2);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < totalPages - 1;

    const pages = [1];
    if (showLeftEllipsis) pages.push('left-ellipsis');
    pages.push(...range(leftSibling, rightSibling));
    if (showRightEllipsis) pages.push('right-ellipsis');
    pages.push(totalPages);
    return pages;
  };

  const pages = buildPages();

  return (
    <nav className="oai-pagination" aria-label="Pagination">
      <ul className="oai-pagination__list">
        <li>
          <button
            className="oai-pagination__btn"
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Previous page"
          >
            &lsaquo;
          </button>
        </li>
        {pages.map((page) =>
          typeof page === 'string' ? (
            <li key={page}>
              <span className="oai-pagination__ellipsis">&hellip;</span>
            </li>
          ) : (
            <li key={page}>
              <button
                className={`oai-pagination__btn ${page === currentPage ? 'oai-pagination__btn--active' : ''}`}
                onClick={() => onPageChange?.(page)}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            </li>
          )
        )}
        <li>
          <button
            className="oai-pagination__btn"
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Next page"
          >
            &rsaquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  /** Current active page */
  currentPage: PropTypes.number,
  /** Total number of pages */
  totalPages: PropTypes.number,
  /** Page change handler */
  onPageChange: PropTypes.func,
  /** Number of sibling pages to show on each side */
  siblingCount: PropTypes.number,
};
