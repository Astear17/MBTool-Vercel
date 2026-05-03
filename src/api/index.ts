import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";
console.log("🌐 API Base URL:", baseURL);

const api = axios.create({
  baseURL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
