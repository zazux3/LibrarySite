import { useState } from "react";
import request from "../api";

export default function BookForm({ onDone }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [desc, setDesc] = useState("");

  async function submit() {
    await request("/books", "POST", {
      title, author, publishedYear: Number(year), genre, description: desc
    });
    setTitle(""); setAuthor(""); setYear(""); setGenre(""); setDesc("");
    if (onDone) onDone();
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Add Book</h3>
      <input className="w-full p-2 border mb-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input className="w-full p-2 border mb-2" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
      <input className="w-full p-2 border mb-2" placeholder="Published Year" value={year} onChange={e => setYear(e.target.value)} />
      <input className="w-full p-2 border mb-2" placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} />
      <input className="w-full p-2 border mb-2" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={submit}>Add Book</button>
    </div>
  );
}
