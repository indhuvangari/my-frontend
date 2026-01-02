
import { useEffect, useState } from "react";
import { listProducts } from "../api/products";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listProducts()
      .then(setProducts)
      .catch((err) => {
        console.error(err);
        setError(err?.response?.data?.detail || "Failed to load products");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        products.map((p) => (
          <div key={p.id}>
            <strong>{p.name}</strong> — {p.price} {p.currency}
          </div>
        ))
      )}
    </div>
  );
}
