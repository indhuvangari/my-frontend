
// src/pages/ProductDetails.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { fetchProductById, fetchProducts } from "../services/repo";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import RatingStars from "../components/RatingStars.jsx";
import "../styles/product-details.css";

const formatINR = (n) =>
  typeof n === "number"
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n)
    : "₹0";

/**
 * This component:
 *  - Loads the product by :id (from URL)
 *  - Loads all products to compute "Related products"
 *  - Supports wishlist/cart actions (requires Auth)
 *  - Shows an image gallery (main + thumbs)
 *  - Handles loading and error states gracefully
 */
export default function ProductDetails() {
  const { id } = useParams(); // URL param
  const location = useLocation();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [all, setAll] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // For gallery: selected main image
  const [mainImg, setMainImg] = useState("");

  const toLogin = () =>
    navigate("/login", { replace: true, state: { from: location } });

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch current product and the full list for "related"
        const [p, list] = await Promise.all([
          fetchProductById(id),
          fetchProducts(),
        ]);

        if (!alive) return;

        setProduct(p);
        setAll(list || []);

        // Initialize main image (prefer first of images array, else imageUrl)
        const firstImage = Array.isArray(p?.images) && p.images.length > 0
          ? p.images[0]
          : p?.imageUrl || "";
        setMainImg(firstImage);
      } catch (e) {
        if (!alive) return;
        // Normalize error to readable string
        const msg =
          e?.response?.data?.message ||
          e?.message ||
          "Something went wrong loading the product.";
        setError(msg);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [id]);

  // Normalize 'id' vs '_id' differences just once
  const productId = product?.id || product?._id;

  const wished = useMemo(
    () =>
      !!productId &&
      wishlist?.some((w) => (w.id || w._id) === productId),
    [wishlist, productId]
  );

  const related = useMemo(() => {
    if (!product) return [];
    const currentCategory = product.category;
    const currentId = productId;

    return (all || [])
      .filter((p) => {
        const pid = p?.id || p?._id;
        return p?.category === currentCategory && pid !== currentId;
      })
      .slice(0, 8);
  }, [all, product, productId]);

  const handleAddCart = () => (user ? addToCart(product) : toLogin());

  const handleWishlistClick = () => {
    if (!user) return toLogin();
    if (!product) return;

    if (wished) {
      // Remove by the normalized id
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-image" />
        <div className="skeleton skeleton-text" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <p>Unable to load product.</p>
        <p className="text-muted">{error}</p>
        <Link to="/" className="btn">
          Back to shop
        </Link>
      </div>
    );
  }

  if (!product) {
    return <div className="page">Product not found.</div>;
  }

  const images = Array.isArray(product.images) ? product.images : [];
  const showThumbs = images.length > 1;

  return (
    <div className="product-details page">
      {/* GALLERY */}
      <div className="gallery">
        <img
          src={mainImg || product.imageUrl || images[0]}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/600x400?text=No+Image";
          }}
        />
        {showThumbs && (
          <div className="thumbs">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${product.name} ${i + 1}`}
                className={src === mainImg ? "active" : ""}
                onClick={() => setMainImg(src)}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/100x100?text=No+Img";
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="info">
        <h1>{product.name}</h1>
        <RatingStars value={Number(product.rating) || 0} />

        <div className="price-row">
          <span className="price">{formatINR(product.price)}</span>

          {product.discountPercent ? (
            <span className="tag">-{product.discountPercent}%</span>
          ) : null}

          {typeof product.inStock === "boolean" &&
            (product.inStock ? (
              <span className="badge success">In stock</span>
            ) : (
              <span className="badge danger">Out of stock</span>
            ))}
        </div>

        {product.description && (
          <p className="desc">{product.description}</p>
        )}

        <div className="actions">
          <button
            disabled={product.inStock === false}
            onClick={handleAddCart}
            aria-label={`Add ${product.name} to cart`}
          >
            {product.inStock === false ? "Out of Stock" : "Add to Cart"}
          </button>

          <button
            className={`wish ${wished ? "active" : ""}`}
            onClick={handleWishlistClick}
            aria-label={
              wished ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            {wished ? "♥ In Wishlist" : "♡ Add to Wishlist"}
          </button>
        </div>

        <div className="meta">
          {product.brand && (
            <div>
              Brand: <b>{product.brand}</b>
            </div>
          )}

          {product.category && (
            <div>
              Category:{" "}
              <Link to={`/?category=${encodeURIComponent(product.category)}`}>
                {product.category}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* RELATED */}
      <section className="related">
        <h2>Related Products</h2>
        <div className="grid">
          {related.map((p) => {
            const relId = p.id || p._id;
            const relImg = p.imageUrl || (Array.isArray(p.images) ? p.images[0] : "");
            return (
              <Link key={relId} to={`/product/${relId}`} className="related-card">
                <img
                  src={relImg}
                  alt={p.name}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/200x150?text=No+Image";
                  }}
                />
                <div>{p.name}</div>
                <div>{formatINR(p.price)}</div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

