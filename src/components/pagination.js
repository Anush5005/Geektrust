import React from "react";
import "./pagination.css";
function Pagination({
  data,
  totalData,
  dataPerPage,
  currentPage,
  deleteSelected,
  paginate,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageNumbers.length;

  return (
    <div className="conatiner">
      <div className="delete-btn">
        <button onClick={deleteSelected}>Delete Selected</button>
      </div>

      <div className="pagination">
        <button
          className={`button ${currentPage === isFirstPage ? "disabled" : ""}`}
          onClick={() => paginate(1)}
          disabled={isFirstPage}
        >
          <span aria-hidden="true">&laquo;&laquo;</span>
        </button>

        <button
          className="button"
          onClick={() => paginate(currentPage - 1)}
          disabled={isFirstPage}
        >
          <span aria-hidden="true">&laquo;</span>
        </button>

        {pageNumbers.map((number) => (
          <button
            onClick={() => paginate(number)}
            className={`button ${currentPage === number ? "active" : ""}`}
          >
            {number}
          </button>
        ))}

        <button
          className="button"
          onClick={() => paginate(currentPage + 1)}
          disabled={isLastPage}
        >
          <span aria-hidden="true">&raquo;</span>
        </button>

        <button
          className="button"
          onClick={() => paginate(pageNumbers.length)}
          disabled={isLastPage}
        >
          <span aria-hidden="true">&raquo;&raquo;</span>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
