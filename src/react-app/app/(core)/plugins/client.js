// client.js
export const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

class APIClient {
  // Add this method to get CSRF token from cookies
  getCsrfToken() {
    const name = "csrftoken";
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  async handleResponse(response) {
    if (response.status === 401) {
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    return response.text();
  }

  async request(url, options = {}) {
    const fullUrl = url.startsWith("http") ? url : `${baseURL}${url}`;

    // Get CSRF token
    const csrfToken = this.getCsrfToken();

    const fetchOptions = {
      ...options,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Add CSRF token to headers for non-GET requests
        ...(options.method !== "GET" && csrfToken
          ? {
              "X-CSRFToken": csrfToken,
            }
          : {}),
        ...options.headers,
      },
    };

    if (fetchOptions.body && typeof fetchOptions.body === "object") {
      fetchOptions.body = JSON.stringify(fetchOptions.body);
    }

    const response = await fetch(fullUrl, fetchOptions);
    return this.handleResponse(response);
  }

  get(url, options = {}) {
    return this.request(url, { ...options, method: "GET" });
  }

  post(url, data = {}, options = {}) {
    return this.request(url, {
      ...options,
      method: "POST",
      body: data,
    });
  }

  put(url, data = {}, options = {}) {
    return this.request(url, {
      ...options,
      method: "PUT",
      body: data,
    });
  }

  patch(url, data = {}, options = {}) {
    return this.request(url, {
      ...options,
      method: "PATCH",
      body: data,
    });
  }

  delete(url, options = {}) {
    return this.request(url, { ...options, method: "DELETE" });
  }
}

const client = new APIClient();
export default client;
