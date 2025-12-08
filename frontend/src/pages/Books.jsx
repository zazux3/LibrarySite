import { useEffect, useState } from "react";
import request from "../api";

export default function Books({ goToStaff, goToLogin }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // decode token to get user id (safe)
  function getMyIdFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      // support both shapes: { id: "..."} or { user: { id: "..." } }
      return payload.id || (payload.user && payload.user.id) || null;
    } catch {
      return null;
    }
  }
  const myId = getMyIdFromToken();

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await request("/books");
      const list = Array.isArray(res) ? res : (res.books || []);
      setBooks(list);
    } catch (err) {
      console.error("Failed loading books:", err);
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function borrow(id) {
    try {
      await request(`/books/${id}/borrow`, "POST");
      await load();
    } catch (err) {
      console.error("Borrow failed:", err);
      alert(err?.message || "Borrow failed");
    }
  }

  async function ret(id) {
    try {
      await request(`/books/${id}/return`, "POST");
      await load();
    } catch (err) {
      console.error("Return failed:", err);
      alert(err?.message || "Return failed");
    }
  }

  function logout() {
    localStorage.clear();
    goToLogin();
  }

  if (loading) return <div className="p-6">Loading books…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Library</h1>
        <div>
          <button className="mr-2 px-3 py-1 bg-gray-200 rounded" onClick={goToStaff}>Staff Panel</button>
          <button className="px-3 py-1 bg-red-200 rounded" onClick={logout}>Logout</button>
        </div>
      </header>

      <ul className="space-y-4">
        {books.length === 0 && <li className="text-gray-600">No books found</li>}
        {books.map((book) => {
          const borrowerId = book.borrowedBy && (book.borrowedBy._id || book.borrowedBy.toString());
          const isBorrowed = !!borrowerId;
          const amIBorrower = borrowerId && myId && borrowerId === myId;

          return (
            <li key={book._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">{book.title}</div>
                <div className="text-sm text-gray-600">{book.author} — {book.publishedYear}</div>
                <div className="text-sm mt-1">{book.description}</div>
                {isBorrowed && (
                  <div className="text-red-600 text-sm mt-1">
                    Borrowed by: { (book.borrowedBy && (book.borrowedBy.name || book.borrowedBy)) || borrowerId }
                  </div>
                )}
              </div>

              <div>
                {!isBorrowed ? (
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                    onClick={() => borrow(book._id)}
                  >
                    Borrow
                  </button>
                ) : (amIBorrower ? (
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded"
                    onClick={() => ret(book._id)}
                  >
                    Return
                  </button>
                ) : (
                  <div className="text-sm text-gray-500">Unavailable</div>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
