export async function apiPost(route, data) {
  if (route === "/auth/login") {
    localStorage.setItem("token", "demo-token");
    return { success: true };
  }
  return {};
}

export const apiGet = async () => [];
export const apiPut = async () => ({});
export const apiDelete = async () => ({});