import { useState } from "react";
import request from "../api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function login(e) {
    e.preventDefault();
    setMsg("");

    try {
      const res = await request("/users/login", "POST", { email, password });
      console.log("Login response:", res);

      if (res.token) {
        localStorage.setItem("token", res.token);
        onLogin(); // navigate
      } else {
        setMsg("No token received.");
      }
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      {msg && <div className="text-red-500">{msg}</div>}

      <form onSubmit={login} className="space-y-4">
        <input
          className="w-full border p-2"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-2">Login</button>
      </form>
    </div>
  );
}
