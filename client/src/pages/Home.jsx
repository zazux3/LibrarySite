// src/pages/Home.jsx
import React from "react";
import BookList from "../components/BookList";

export default function Home() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Digital Library</h1>
      <BookList />
    </div>
  );
}
