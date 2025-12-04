// src/components/BookForm.jsx
import React, { useState, useEffect } from "react";

export default function BookForm({ initial = {}, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (initial) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(initial.title || "");
      setAuthor(initial.author || "");
    }
  }, [initial]);

  function submit(e) {
    e.preventDefault();
    if (!title) return alert("Title required");
    onSave({ title, author });
    setTitle("");
    setAuthor("");
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 12 }}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
      <button type="submit">Save</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}
