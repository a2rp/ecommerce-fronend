import axios from "axios";

const isLocalhost = window.location.hostname === "localhost";

export const BASE_URL = isLocalhost
    ? "http://localhost:1198"
    : "https://ecommerce-backend-cvl8.onrender.com";

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // optional: only needed if using cookies/auth
});
