
// src/context/WishlistContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const storageKey = useMemo(() => (user ? `wishlist_${user.id}` : null), [user]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!storageKey) { setWishlist([]); return; }
    try {
      const raw = localStorage.getItem(storageKey);
      setWishlist(raw ? JSON.parse(raw) : []);
    } catch { setWishlist([]); }
  }, [storageKey]);

  useEffect(() => {
    if (storageKey) localStorage.setItem(storageKey, JSON.stringify(wishlist));
  }, [wishlist, storageKey]);

  const addToWishlist = (product) => {
    if (!user) return;
    setWishlist(prev => (prev.some(i => i.id === product.id) ? prev : [...prev, product]));
  };
  const removeFromWishlist = (id) => setWishlist(prev => prev.filter(i => i.id !== id));

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
