const API_BASE = "http://localhost:3005";

/* =========================
   Core Request
========================= */
async function apiRequest(method, route, data = null) {
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(API_BASE + route, options);

  let result;
  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (!response.ok) {
    throw result || { message: "API Error" };
  }

  return result;
}

/* =========================
   HTTP Helpers
========================= */
export const apiGet = (route) => apiRequest("GET", route);
export const apiPost = (route, data) => apiRequest("POST", route, data);
export const apiPut = (route, data) => apiRequest("PUT", route, data);
export const apiDelete = (route) => apiRequest("DELETE", route);

/* =========================
   AUTH
========================= */
export const signupApi = (data) =>
  apiPost("/auth/signup", data);

export const loginApi = async (data) => {
  const res = await apiPost("/auth/login", data);

  // حفظ التوكن
  if (res?.token) {
    localStorage.setItem("token", res.token);
  }

  return res;
};

export const logoutApi = () =>
  apiPost("/auth/logout");

export const changePasswordApi = (data) =>
  apiPost("/auth/change-password", data);

/* =========================
   DASHBOARD
========================= */
export const getDashboard = () =>
  apiGet("/dashboard");

/* =========================
   CATEGORIES
========================= */
export const getCategories = () =>
  apiGet("/categories");

export const getCategoryById = (id) =>
  apiGet(`/categories/${id}`);

export const addCategory = (data) =>
  apiPost("/categories", data);

export const updateCategory = (id, data) =>
  apiPut(`/categories/${id}`, data);

export const deleteCategory = (id) =>
  apiDelete(`/categories/${id}`);