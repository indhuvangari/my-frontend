
import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top grid */}
        <div className="footer-grid">
          {/* About */}
          <div>
            <h4 className="footer-title">ShopCart</h4>
            <p className="footer-text">Quality products, fast delivery.</p>

            <div className="payments" aria-label="Payment methods">
              <span className="pay-badge">UPI</span>
              <span className="pay-badge">RuPay</span>
              <span className="pay-badge">Visa</span>
              <span className="pay-badge">MasterCard</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="footer-subtitle">Categories</h5>
            <ul className="footer-links">
              <li><Link to="/categories/men">Men</Link></li>
              <li><Link to="/categories/women">Women</Link></li>
              <li><Link to="/categories/home">Home</Link></li>
              <li><Link to="/categories/kitchen">Kitchen</Link></li>
              <li><Link to="/categories/beauty">Beauty</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h5 className="footer-subtitle">Customer Support</h5>
            <ul className="footer-links">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/shipping">Shipping &amp; Delivery</Link></li>
              <li><Link to="/returns">Returns &amp; Refunds</Link></li>
              <li><Link to="/track">Order Tracking</Link></li>
              <li><Link to="/warranty">Warranty</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h5 className="footer-subtitle">Social Links</h5>
            <ul className="footer-links">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://x.com" target="_blank" rel="noreferrer">X (Twitter)</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="footer-subtitle">Newsletter</h5>
            <form
              className="newsletter"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: Hook up your subscribe handler or Toast here
              }}
            >
              <input type="email" placeholder="Your email" aria-label="Email" required />
              <button className="btn btn-primary" type="submit">Subscribe</button>
              <small className="footer-text">
                By subscribing, you agree to our Privacy Policy.
              </small>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} ShopCart. All rights reserved.</small>
          <div className="locale">
            <label>
              <span className="sr-only">Currency</span>
              <select aria-label="Currency">
                <option>INR</option>
              </select>
            </label>
            <label>
              <span className="sr-only">Language</span>
              <select aria-label="Language">
                <option>English</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </footer>
  );
}
