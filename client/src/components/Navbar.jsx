// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ActiveLink({ to, children }) {
  const { pathname } = useLocation();
  const style = pathname === to ? { fontWeight: 700, color: "#0b5" } : {};
  return <Link to={to} style={style}>{children}</Link>;
}

export default function Navbar() {
  const { user, signOut } = useAuth();
  return (
    <nav style={{ padding: 12, background: "#f6f7fb", display: "flex", gap: 12 }}>
      <ActiveLink to="/">Home</ActiveLink>
      {user ? (
        <>
          <ActiveLink to="/profile">My Profile</ActiveLink>
          <button onClick={signOut}>Sign Out</button>
        </>
      ) : (
        <>
          <ActiveLink to="/signin">Sign In</ActiveLink>
          <ActiveLink to="/signup">Sign Up</ActiveLink>
        </>
      )}
    </nav>
  );
}
