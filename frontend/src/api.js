const API_BASE = "http://localhost:3000";

export async function apiRequest(method, route, data = null) {
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: { "Content-Type": "application/json" }
  };

  if (token) options.headers["Authorization"] = `Bearer ${token}`;
  if (data) options.body = JSON.stringify(data);

  const res = await fetch(API_BASE + route, options);
  const json = await res.json();

  if (!res.ok) throw json;
  return json;
}

export const apiGet = (route) => apiRequest("GET", route);
export const apiPost = (route, data) => apiRequest("POST", route, data);
export const apiPut = (route, data) => apiRequest("PUT", route, data);
export const apiDelete = (route) => apiRequest("DELETE", route);
