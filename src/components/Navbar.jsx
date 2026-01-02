
// src/components/Navbar.jsx
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const wishCount = wishlist.length;

  // Ref for focusing the search input via "/"
  const inputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      // Ignore when typing with modifiers (Cmd/Ctrl/Alt)
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // Do not steal focus when user is already editing a field
      const tag = e.target.tagName;
      const isEditable =
        e.target.isContentEditable ||
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT";
      if (isEditable) return;

      if (e.key === "/") {
        e.preventDefault(); // avoids typing "/" anywhere
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav className="navbar">
      {/* Left */}
      <div className="nav-left">
        <span className="brand">ShopCart</span>
        <Link to="/">Home</Link>
        <Link to="/chat">Chat</Link>
      </div>

      {/* Centered search */}
      <div className="nav-center">
        <div className="nav-search-wrap">
          <input
            ref={inputRef}
            className="nav-search"
            type="text"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
          {query && (
            <button
              className="search-clear"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              title="Clear"
              type="button"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="nav-right">
        {user ? (
          <>
            <Link to="/wishlist" className="pill">
              🤍 <span className="badge">{wishCount}</span>
            </Link>
            <Link to="/cart" className="pill">
              🛒 <span className="badge">{cartCount}</span>
            </Link>
            <span className="user-email">{user.email}</span>
            <button
              className="btn btn-ghost"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">Login</Link>
      
            <Link to="/register" className="btn btn-ghost">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
