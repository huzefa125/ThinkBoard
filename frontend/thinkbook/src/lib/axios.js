// src/lib/axios.js
import axios from "axios";
const base_URL = import.meta.env.MODE === "development" ? "httpp://localhost:8000/api" : "/api";
const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export default api;  