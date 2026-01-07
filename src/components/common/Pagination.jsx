export default function Pagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onPageChange
}) {
  return (
    <div className="pagination">
      {/* Prev Button */}
      <button
        className="nav-btn"
        disabled={currentPage === 1}
        onClick={onPrev}
      >
        Prev
      </button>

      {/* Page Numbers */}
      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              className={`page-btn ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        className="nav-btn"
        disabled={currentPage === totalPages}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
}
