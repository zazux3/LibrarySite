import { useEffect, useState } from "react";
import request from "../api";
import BookForm from "../components/BookForm";

export default function Staff({ goToBooks, goToLogin }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const res = await request("/books");
      setBooks(res.books || res || []);
    }
    fetchBooks();
  }, []);

  async function load() {
    const res = await request("/books");
    setBooks(res.books || res || []);
  }

  async function remove(id) {
    await request(`/books/${id}`, "DELETE");
    load();
  }

  function logout() {
    localStorage.clear();
    goToLogin();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staff Panel</h1>
        <div>
          <button className="mr-2 px-3 py-1 bg-gray-200 rounded" onClick={goToBooks}>Back</button>
          <button className="px-3 py-1 bg-red-200 rounded" onClick={logout}>Logout</button>
        </div>
      </header>

      <BookForm onDone={load} />

      <h2 className="mt-6 text-lg font-semibold">Existing Books</h2>
      <ul className="space-y-3 mt-3">
        {books.map(b => (
          <li key={b._id} className="p-3 bg-white rounded shadow flex justify-between">
            <div>
              <div className="font-semibold">{b.title}</div>
              <div className="text-sm text-gray-600">{b.author}</div>
            </div>
            <div>
              <button className="mr-2 px-3 py-1 bg-yellow-400 rounded">Edit</button>
              <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => remove(b._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
