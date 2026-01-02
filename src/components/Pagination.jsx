
// src/components/Pagination.jsx
import React from 'react';

export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={onPrev}>Prev</button>
      <span>{page} / {totalPages}</span>
      <button disabled={page === totalPages} onClick={onNext}>Next</button>
    </div>
  );
}
