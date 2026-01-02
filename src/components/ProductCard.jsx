
// src/components/ProductCard.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom"; // <-- add Link
import "../styles/product-card.css";

const formatINR = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

function RatingStars({ value = 0 }) {
  const v = Math.max(0, Math.min(5, Number(value) || 0));
  const stars = [1, 2, 3, 4, 5].map((n) => (
    <span key={n} aria-hidden="true">{v >= n ? "★" : "☆"}</span>
  ));
  return (
    <div className="rating" aria-label={`Rating ${v.toFixed(1)} out of 5`}>
      <span className="stars">{stars}</span>
      <span className="rating-val">{v.toFixed(1)}</span>
    </div>
  );
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toLogin = () => navigate("/login", { replace: true, state: { from: location } });
  const isInWishlist = wishlist.some((w) => w.id === product.id);

  const handleAddCart = () => (user ? addToCart(product) : toLogin());
  const handleToggleWishlist = () => {
    if (!user) return toLogin();
    if (isInWishlist) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  return (
    <article className="card">
      {/* Image area with floating wishlist heart */}
      <div className="img-wrap">
        {/* Make image clickable -> navigates to /product/:id */}
        <Link to={`/product/${product.id}`} className="card-image-link" aria-label={`View details of ${product.name}`}>
          <img src={product.imageUrl} alt={product.name} loading="lazy" />
        </Link>

        <button
          className={`wish-fab ${isInWishlist ? "active" : ""}`}
          onClick={handleToggleWishlist}
          aria-pressed={isInWishlist}
          title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          type="button"
        >
          {isInWishlist ? "❤️" : "♡"}
        </button>
      </div>

      {/* Make name clickable -> navigates to /product/:id */}
      <h4 className="name">
        <Link to={`/product/${product.id}`} className="name-link">
          {product.name}
        </Link>
      </h4>

      <div className="meta-row">
        <RatingStars value={product.rating} />
        <span className={`stock ${product.inStock ? "in" : "out"}`}>
          {product.inStock ? "In stock" : "Out of stock"}
        </span>
      </div>

      <p className="price">{formatINR(product.price)}</p>

      {/* Single CTA row */}
      <div className="actions">
        <button
          className="btn"
          onClick={handleAddCart}
          aria-label={`Add ${product.name} to cart`}
          type="button"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
