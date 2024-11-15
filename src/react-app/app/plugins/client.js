// client.js
export const baseURL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

class APIClient {
  async handleResponse(response) {
    if (response.status === 401) {
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`,
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    return response.text();
  }

  async request(url, options = {}) {
    const fullUrl = url.startsWith("http") ? url : `${baseURL}${url}`;

    const fetchOptions = {
      ...options,
      credentials: "include", // Equivalent to withCredentials: true
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
