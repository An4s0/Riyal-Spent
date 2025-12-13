const API_BASE = "http://localhost:3000";

/**
 * Generic API request handler
 */
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
   HTTP Methods
========================= */

export const apiGet = (route) => apiRequest("GET", route);

export const apiPost = (route, data) =>
  apiRequest("POST", route, data);

export const apiPut = (route, data) =>
  apiRequest("PUT", route, data);

export const apiDelete = (route) =>
  apiRequest("DELETE", route);

/* =========================
   AUTH APIs
========================= */

export const loginApi = (data) =>
  apiPost("/auth/login", data);

export const signupApi = (data) =>
  apiPost("/auth/signup", data);

/* =========================
   EXPENSES APIs
========================= */

export const getExpenses = () =>
  apiGet("/expenses");

export const getExpenseById = (id) =>
  apiGet(`/expenses/${id}`);

export const addExpense = (data) =>
  apiPost("/expenses", data);

export const updateExpense = (id, data) =>
  apiPut(`/expenses/${id}`, data);

export const deleteExpense = (id) =>
  apiDelete(`/expenses/${id}`);

/* =========================
   CATEGORIES APIs
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