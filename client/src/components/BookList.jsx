// src/components/BookList.jsx
import React, { useEffect, useState } from "react";
import { api } from "../api";
import BookItem from "./BookItem";
import BookForm from "./BookForm";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null);

  // eslint-disable-next-line react-hooks/immutability
  useEffect(() => { fetchBooks(); }, []);

  async function fetchBooks() {
    try {
      const data = await api.getBooks();
      // adapt to your backend response structure
      setBooks(Array.isArray(data) ? data : data.books || []);
    } catch (e) {
      console.error("fetchBooks error", e);
      setBooks([]);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this book?")) return;
    await api.deleteBook(id);
    fetchBooks();
  }

  async function handleCreate(payload) {
    await api.createBook(payload);
    fetchBooks();
  }

  async function handleUpdate(id, payload) {
    await api.updateBook(id, payload);
    setEditing(null);
    fetchBooks();
  }

  return (
    <div>
      <h3>Books</h3>
      <BookForm onSave={handleCreate} />
      <ul>
        {books.map(book => (
          <BookItem
            key={book._id || book.id}
            book={book}
            onEdit={() => setEditing(book)}
            onDelete={() => handleDelete(book._id || book.id)}
          />
        ))}
      </ul>

      {editing && (
        <div>
          <h4>Edit</h4>
          <BookForm
            initial={editing}
            onSave={(payload) => handleUpdate(editing._id || editing.id, payload)}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}
    </div>
  );
}
