import { useState } from "react";
import Login from "./pages/Login";
import Books from "./pages/Books";

export default function App() {
  const [page, setPage] = useState(
    localStorage.getItem("token") ? "books" : "login"
  );

  return (
    <>
      {page === "login" && (
        <Login onLogin={() => setPage("books")} />
      )}
      {page === "books" && (
        <Books goToLogin={() => setPage("login")} />
      )}
    </>
  );
}
