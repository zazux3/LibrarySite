// src/pages/SignIn.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await signIn({ email, password });
      nav("/");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Sign in failed");
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>Sign In</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button>Sign In</button>
    </form>
  );
}
