
// src/context/AuthContext.jsx
import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("auth_user", null);

  const login = async ({ email, password }) => {
    if (!email || !password) throw new Error("Email and password are required");
    const u = { id: email.toLowerCase(), email };
    setUser(u);
    return u;
  };

  const register = async ({ name, email, password }) => {
    if (!name || !email || !password) throw new Error("All fields are required");
    const u = { id: email.toLowerCase(), email, name };
    setUser(u);
    return u;
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
