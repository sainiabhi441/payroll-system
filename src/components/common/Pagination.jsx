export default function Pagination({
  currentPage,
  totalPages,
  onPrev,
  onNext
}) {
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={onPrev}
      >
        Prev
      </button>

      <span style={{ margin: "0 12px" }}>
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
}
