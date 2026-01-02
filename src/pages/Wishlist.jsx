
import React from "react";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import "../styles/product-grid.css";
import "../styles/layout.css"; // helper classes below

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <main className="content">
      <div className="container">
        <h2 className="page-title">Wishlist</h2>

        {wishlist.length === 0 ? (
          <p className="muted">Your wishlist is empty.</p>
        ) : (
          <section className="product-grid centered-grid">
            {wishlist.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
