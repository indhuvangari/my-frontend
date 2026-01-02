
// src/lib/http.js
import axios from "axios";

/**
 * With Vite proxy:
 * - Keep baseURL as a relative path '/api'
 * - Vite forwards to http://127.0.0.1:80
 */
export const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export const http = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // set true if you use cookies/sessions
});
