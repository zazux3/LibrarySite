const API_URL = "http://localhost:5001/api";

export default async function request(path, method = "GET", body) {
  const token = localStorage.getItem("token");

  const res = await fetch(API_URL + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data.message || "Request failed");

  return data;
}
