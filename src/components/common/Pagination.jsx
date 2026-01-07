export default function Pagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onPageChange
}) {
  // Agar sirf 1 page ho to pagination mat dikhao
  if (totalPages <= 1) return null;

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
              onClick={() => onPageChange && onPageChange(page)}
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
