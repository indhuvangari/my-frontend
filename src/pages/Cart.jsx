
// src/pages/Cart.jsx
import React, { useMemo } from "react";
import { useCart } from "../context/CartContext";
import "../styles/cart.css";

const formatINR = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

export default function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + (Number(item.price) * item.qty), 0),
    [cart]
  );

  if (cart.length === 0) {
    return (
      <main className="content" style={{ padding: "1rem" }}>
        <h2 style={{ margin: "0 0 1rem 0" }}>Cart</h2>
        <p>Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main className="content" style={{ padding: "1rem" }}>
      <h2 style={{ margin: "0 0 1rem 0" }}>Cart</h2>

      {/* Two-column layout: list (left) + summary (right) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "16px" }}>
        {/* ===== Left: Cart items list ===== */}
        <section className="cart-list">
          {cart.map((item) => {
            const imgSrc = item.image || item.imageUrl || item.thumbnail;
            const title = item.title || item.name || "Product";
            const lineTotal = Number(item.price) * item.qty;

            return (
              <article className="cart-item" key={item.id}>
                {/* Image */}
                <img
                  className="cart-item__img"
                  src={imgSrc}
                  alt={title}
                  loading="lazy"
                />

                {/* Info + controls */}
                <div>
                  <div className="cart-item__title">{title}</div>
                  <div className="cart-item__price">{formatINR(item.price)}</div>

                  <div className="cart-item__controls">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${title}`}
                      onClick={() => decreaseQty(item.id)}
                    >
                      –
                    </button>

                    <span aria-live="polite">{item.qty}</span>

                    <button
                      type="button"
                      className="btn-qty-plus"
                      aria-label={`Increase quantity of ${title}`}
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>

                    <button
                      type="button"
                      className="cart-item__remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${title}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Line subtotal on the right */}
                <div className="cart-item__line-total">
                  Subtotal: {formatINR(lineTotal)}
                </div>
              </article>
            );
          })}
        </section>

        {/* ===== Right: Summary box ===== */}
        <aside className="cart-summary">
          <div>
            <h3 style={{ margin: 0 }}>Summary</h3>
            <div style={{ color: "#6b7280", fontSize: ".9rem" }}>
              Items: {cart.reduce((s, i) => s + i.qty, 0)}
            </div>
          </div>

          <div style={{ textAlign: "right", fontWeight: 700 }}>
            Total: {formatINR(total)}
          </div>

          <div className="cart-summary__actions">
            <button className="cart-clear" onClick={clearCart}>Clear Cart</button>
            <button className="cart-checkout">Checkout</button>
          </div>
        </aside>
      </div>
    </main>
  );
}
