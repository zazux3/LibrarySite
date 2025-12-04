// src/pages/Profile.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  if (!user) return <div>Please sign in.</div>;
  return (
    <div>
      <h2>Profile</h2>
      <div>Email: {user.email}</div>
      {/* add more fields if backend returns them */}
    </div>
  );
}
