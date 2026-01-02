
// src/context/WishlistContext.jsx
import { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const WishlistContext = createContext(null);

// Provider (named export). You can also export default at the end if you like.
export function WishlistProvider({ children }) {
  // Persist wishlist: array of product IDs
  const [wishlist, setWishlist] = useLocalStorage('wishlist', []);

  const add = (id) =>
    setWishlist((prev) => (prev.includes(id) ? prev : [...prev, id]));

  const remove = (id) =>
    setWishlist((prev) => prev.filter((x) => x !== id));

  const toggle = (id) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const clear = () => setWishlist([]);

  const value = useMemo(
    () => ({ wishlist, add, remove, toggle, clear }),
    [wishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

// 🔹 Named export hook — THIS is what ProductDetails.jsx imports.
export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return ctx;
}

// Optional: also export default for convenience when importing the provider.
export default WishlistProvider;
