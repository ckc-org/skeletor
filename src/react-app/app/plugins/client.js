import axios from "axios";

export const baseURL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

const client = axios.create({
  baseURL,
  // Include credentials to send/receive cookies
  withCredentials: true,
  xsrfHeaderName: "X-CSRFToken",
  xsrfCookieName: "csrftoken",
});

// No need for request interceptor with cookie auth since cookies
// are automatically sent with requests

// Response interceptor now just handles unauthorized responses
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login page on unauthorized
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default client;
