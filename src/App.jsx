
// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
 
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Chat from "./pages/Chat";
import Login from "./pages/LOgin";
import Register from "./pages/Register";
 
// NEW: import ProductDetails page
import ProductDetails from "./pages/ProductDetails";
 
// Protected routes wrapper
import RequireAuth from "./routes/RequireAuth";
 
export default function App() {
  return (
    <>
      <Navbar />
 
      {/* All routed pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
 
        {/* NEW: public product details route (works for all products) */}
        <Route path="/product/:id" element={<ProductDetails />} />
 
        {/* Protected section only */}
        <Route element={<RequireAuth />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
 
        {/* Public (unprotected) auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
 
      {/* Global footer shown on all pages */}
      <Footer />
    </>
  );
}
 