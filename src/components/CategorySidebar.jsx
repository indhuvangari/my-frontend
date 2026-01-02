
import { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function CategorySidebar({ products = [] }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const counts = useMemo(() => {
    const map = new Map();
    products.forEach(p => map.set(p.category, (map.get(p.category) || 0) + 1));
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [products]);

  const current = params.get("category") || "All";

  const go = (cat) => {
    const next = new URLSearchParams(params);
    if (cat === "All") next.delete("category"); else next.set("category", cat);
    next.delete("page");
    navigate({ pathname: "/", search: `?${next.toString()}` });
  };

  return (
    <div className="category-sidebar">
      <h4>Categories</h4>
      <button className={current === "All" ? "active" : ""} onClick={() => go("All")}>
        All <span className="count">{products.length}</span>
      </button>
      {counts.map(([cat, n]) => (
        <button key={cat} className={current === cat ? "active" : ""} onClick={() => go(cat)}>
          {cat} <span className="count">{n}</span>
        </button>
      ))}
    </div>
  );
}
