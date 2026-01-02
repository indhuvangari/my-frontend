
// src/components/CategoriesSection.jsx
import React from "react";
import { categories } from "../data/categories";
import "../styles/categories.css";

export default function CategoriesSection({ active, onChange }) {
  return (
    <section className="categories-section">
      <div className="categories-header">
        <h3>Categories</h3>
      </div>

      <div className="categories-grid">
        {categories.map(cat => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              className={`category-tile ${isActive ? "active" : ""}`}
              onClick={() => onChange(cat.id)}
              aria-pressed={isActive}
              title={cat.name}
            >
              <div className="tile-image">
                <img src={cat.imageUrl} alt={cat.name} loading="lazy" />
              </div>
              <div className="tile-label">{cat.name}</div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
