
// src/components/Leftcategories.jsx
import React from "react";
import "../styles/left-categories.css";
import { CATEGORIES } from "../data/categories"; // centralized category list

// Map category keys to SVG icons
const ICONS = {
  men: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3h10v2H7zM8 7h8l2 7v7H6v-7l2-7z" stroke="#374151" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  women: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="7" r="3" stroke="#374151" strokeWidth="1.5" />
      <path d="M12 10v4M10 14h4M12 14v5" stroke="#374151" strokeWidth="1.5" />
    </svg>
  ),
  home: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z" stroke="#374151" strokeWidth="1.5" />
      <path d="M9 21v-6h6v6" stroke="#374151" strokeWidth="1.5" />
    </svg>
  ),
  kitchen: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 3h12v4H6zM7 9h10v12H7z" stroke="#374151" strokeWidth="1.5" />
      <path d="M10 13h4" stroke="#374151" strokeWidth="1.5" />
    </svg>
  ),
  beauty: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 3h8v6H8zM10 9v12" stroke="#374151" strokeWidth="1.5" />
      <path d="M14 9v12" stroke="#374151" strokeWidth="1.5" />
    </svg>
  ),
};

export default function Leftcategories({
  active = "all",
  onChange,
  rating,
  onRatingChange,
  inStock,
  onInStockChange,
}) {
  return (
    <aside className="left-categories">
      <div className="left-cat-header">
        <h3 className="left-cat-title">Categories</h3>
      </div>

      <ul className="left-cat-list" role="list">
        <li>
          <button
            type="button"
            className={`left-cat-item ${active === "all" ? "active" : ""}`}
            onClick={() => onChange("all")}
            aria-pressed={active === "all"}
          >
            <span>All</span>
          </button>
        </li>
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.key;
          const svg = ICONS[cat.key];
          return (
            <li key={cat.key}>
              <button
                type="button"
                className={`left-cat-item ${isActive ? "active" : ""}`}
                onClick={() => onChange(cat.key)}
                aria-pressed={isActive}
              >
                {svg && <span className="left-cat-icon">{svg}</span>}
                <span>{cat.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <hr className="left-cat-divider" />

      <div className="left-cat-filters">
        <span className="left-cat-sec-label">Filters</span>

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => onInStockChange?.(e.target.checked)}
          />
          <span>In stock only</span>
        </label>

        <label className="left-cat-sec-label" htmlFor="rating-select">
          Min rating
        </label>
        <select
          id="rating-select"
          value={rating ?? ""}
          onChange={(e) => {
            const v = e.target.value;
            onRatingChange?.(v ? Number(v) : null);
          }}
        >
          <option value="">Any</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="4.5">4.5+</option>
        </select>
      </div>
    </aside>
  );
}
