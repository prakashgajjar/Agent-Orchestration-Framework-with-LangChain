import axios from "axios";

const api = axios.create({
  baseURL:  import.meta.env.VITE_API_BASE_URL_USER_SERVICES,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Global response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
    };

    return Promise.reject(customError);
  }
);

export default api;
