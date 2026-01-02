

// src/services/api.js
import axios from "axios";

/**
 * Dev setup:
 * - In vite.config.js, proxy '/api' -> 'http://localhost:<your-backend-port>'
 * - In .env, set VITE_API_BASE=/api
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "/api",
  withCredentials: true, // set true if you use cookies/session; false if only JWT
});

// Attach token if you use JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
