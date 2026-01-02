
// src/pages/Home.jsx
import React, { useEffect, useMemo, useState } from "react";
import LeftCategories from "../components/Leftcategories";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { useSearch } from "../context/SearchContext";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../data/products";
import "../styles/product-grid.css";
import "../styles/layout.css";

const PAGE_SIZE = 8;

// Normalize legacy category values, e.g., "All" -> "all", "Men" -> "men"
const normalizeCat = (v) => {
  if (!v) return "all";
  const s = String(v).trim().toLowerCase();
  return s === "all" ? "all" : s;
};

export default function Home() {
  const [category, setCategory] = useState("all");
  const [rating, setRating] = useState(null);   // null => Any
  const [inStock, setInStock] = useState(false);
  const [page, setPage] = useState(1);

  const { query, setQuery } = useSearch();
  const [params, setParams] = useSearchParams();

  // ✅ Initialize from URL (deep-link support)
  useEffect(() => {
    const cat = params.get("cat");
    if (cat) setCategory(normalizeCat(cat));

    const r = params.get("rating");
    if (r) setRating(Number(r));

    const s = params.get("stock");
    if (s) setInStock(s === "1" || s === "true");

    const pg = params.get("page");
    if (pg) setPage(Math.max(1, Number(pg)));

    const qParam = params.get("q");
    if (qParam !== null) setQuery(qParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once on mount

  // 🧠 Filtered list (computed)
  const filtered = useMemo(() => {
    return searchProducts({
      q: query,
      category,
      inStockOnly: inStock,
      minRating: rating ?? 0,
    });
  }, [query, category, inStock, rating]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSlice = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Guard if page overflows after filters change
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  // ⌨️ Keyboard shortcuts: ArrowLeft / ArrowRight
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName;
      const isEditable =
        e.target.isContentEditable ||
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT";
      if (isEditable) return;

      if (e.key === "ArrowLeft") {
        setPage((p) => Math.max(1, p - 1));
      } else if (e.key === "ArrowRight") {
        setPage((p) => Math.min(totalPages, p + 1));
      }
    };

    window.addEventListener("keydown", onKey, { passive: true });
    return () => window.removeEventListener("keydown", onKey);
  }, [totalPages]);

  // 🔄 Keep filters/search/page in the URL
  useEffect(() => {
    const next = new URLSearchParams(params); // preserve any unknown params

    if (category && category !== "all") next.set("cat", category);
    else next.delete("cat");

    if (rating) next.set("rating", String(rating));
    else next.delete("rating");

    if (inStock) next.set("stock", "1");
    else next.delete("stock");

    if (page > 1) next.set("page", String(page));
    else next.delete("page");

    const q = (query || "").trim();
    if (q || next.has("q")) next.set("q", q);
    else next.delete("q");

    // Avoid polluting history; remove { replace: true } to keep history
    setParams(next, { replace: true });
  }, [category, rating, inStock, page, query, params, setParams]);

  // 🧭 Reset to first page when any filter changes
  useEffect(() => {
    setPage(1);
  }, [query, category, inStock, rating]);

  return (
    <div className="home layout">
      {/* LEFT: sidebar categories + filters */}
      <LeftCategories
        active={category}
        onChange={(c) => {
          setCategory(normalizeCat(c));
          setPage(1);
        }}
        rating={rating}
        onRatingChange={(r) => {
          setRating(r);
          setPage(1);
        }}
        inStock={inStock}
        onInStockChange={(v) => {
          setInStock(v);
          setPage(1);
        }}
      />

      {/* RIGHT: products + pagination */}
      <main className="content">
        <section className="product-grid">
          {pageSlice.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          {pageSlice.length === 0 && <p>No products found.</p>}
        </section>

        <div className="pagination" aria-label="Pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
            title="Previous (←)"
          >
            Prev
          </button>
          <span aria-live="polite" aria-atomic="true">
            {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            aria-label="Next page"
            title="Next (→)"
          >
            Next
          </button>
        </div>

      </main>
    </div>
  );
}
