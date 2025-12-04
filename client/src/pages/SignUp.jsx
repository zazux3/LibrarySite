// src/pages/SignUp.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await signUp({ email, password });
      nav("/");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Sign up failed");
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>Sign Up</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button>Sign Up</button>
    </form>
  );
}
