// src/utils/axiosInstance.js
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:3000/api/v1/notes" 
  : "/api/v1/notes";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, //cookies for auth
});

//Bearer token from localStorage before each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get cookie 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
