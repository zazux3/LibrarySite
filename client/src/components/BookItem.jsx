// src/components/BookItem.jsx
import React from "react";

export default function BookItem({ book, onEdit, onDelete }) {
  return (
    <li style={{ marginBottom: 8 }}>
      <strong>{book.title}</strong> — {book.author}
      <div style={{ display: "inline-block", marginLeft: 8 }}>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete} style={{ marginLeft: 8 }}>Delete</button>
      </div>
    </li>
  );
}
