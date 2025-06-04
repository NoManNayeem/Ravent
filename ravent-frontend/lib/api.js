// lib/api.js

import axios from "axios";

// 1. Create an Axios instance with the base URL of your DRF backend
const api = axios.create({
  baseURL: "http://localhost:8000/api", // adjust if your backend URL differs
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Attach the access token (if present) to every request
api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" && localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. Optional: Handle 401 errors globally (e.g., token expiration)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // For example, you might auto-redirect to login on 401
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
