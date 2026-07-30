import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Local fallback keeps development workflow unchanged when env is not set.
const fallbackBaseUrl = "http://localhost:5000/api";

const baseURL = configuredBaseUrl || fallbackBaseUrl;

const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach JWT token to every request
api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;

    },
    (error) => Promise.reject(error)
);

export default api;