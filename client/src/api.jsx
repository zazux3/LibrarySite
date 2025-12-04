// src/api.js
const API_BASE = ""; // empty => same origin when served by Express; use '/api' if backend prefixed

function getToken() {
  return localStorage.getItem("token");
}

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const token = getToken();
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };
  if (token) opts.headers["Authorization"] = `Bearer ${token}`;
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${path}`, opts);
  const text = await res.text();
  let data;
  // eslint-disable-next-line no-unused-vars
  try { data = text ? JSON.parse(text) : {}; } catch (e) { data = text; }
  if (!res.ok) throw { status: res.status, data };
  return data;
}

export const api = {
  getBooks: () => request("/api/books"),
  getBook: (id) => request(`/api/books/${id}`),
  createBook: (payload) => request("/api/books", { method: "POST", body: payload }),
  updateBook: (id, payload) => request(`/api/books/${id}`, { method: "PUT", body: payload }),
  deleteBook: (id) => request(`/api/books/${id}`, { method: "DELETE" }),
  signIn: (body) => request("/api/auth/login", { method: "POST", body }),
  signUp: (body) => request("/api/auth/register", { method: "POST", body }),
  getProfile: () => request("/api/auth/me"),
};
