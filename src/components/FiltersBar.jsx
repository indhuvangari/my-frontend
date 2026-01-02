
// src/components/FiltersBar.jsx
import React from 'react';

const FiltersBar = ({ inStockOnly, setInStockOnly, minRating, setMinRating }) => {
  return (
    <div className="filters-bar">
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
        />
        &nbsp;In stock only
      </label>

      <label style={{ marginLeft: 16 }}>
        Min rating:&nbsp;
        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
        >
          <option value={0}>Any</option>
          <option value={3.5}>3.5+</option>
          <option value={4.0}>4.0+</option>
          <option value={4.5}>4.5+</option>
        </select>
      </label>
    </div>
  );
};

export default FiltersBar;
