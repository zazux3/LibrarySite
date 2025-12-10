const API = "http://localhost:5001/api";
let token = localStorage.getItem("token");

function checkAuth() {
  if (token) {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("app").style.display = "block";
    document.getElementById("logout-btn").style.display = "inline";
    document.getElementById("user-greeting").innerText = "Welcome!";
    loadBooks();
  }
}

async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  alert(res.ok ? "Registered! Now login" : "Registration failed");
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (data.token) {
    token = data.token;
    localStorage.setItem("token", token);
    checkAuth();
  } else {
    alert("Login failed");
  }
}

function logout() {
  localStorage.removeItem("token");
  location.reload();
}

async function addBook() {
  const book = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    publishedYear: +document.getElementById("year").value,
    genre: document.getElementById("genre").value,
    description: document.getElementById("desc").value,
  };

  await fetch(`${API}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(book),
  });

  clearForm();
  loadBooks();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("year").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("desc").value = "";
  const btn = document.querySelector("#app button");
  btn.textContent = "Add Book";
  btn.onclick = addBook;
}

function editBook(book) {
  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("year").value = book.publishedYear;
  document.getElementById("genre").value = book.genre;
  document.getElementById("desc").value = book.description;

  const addBtn = document.querySelector("#app button");
  addBtn.textContent = "Update Book";
  addBtn.onclick = function () {
    updateBook(book._id);
  };
}

async function updateBook(id) {
  const updatedBook = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    publishedYear: +document.getElementById("year").value,
    genre: document.getElementById("genre").value,
    description: document.getElementById("desc").value,
  };

  await fetch(`${API}/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedBook),
  });

  clearForm();
  loadBooks();
}

async function deleteBook(id) {
  if (confirm("Delete this book permanently?")) {
    await fetch(`${API}/books/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadBooks();
  }
}

async function loadBooks() {
  try {
    const res = await fetch(`${API}/books`);
    const data = await res.json();
    const books = data.books || [];

    const list = document.getElementById("books-list");

    if (books.length === 0) {
      list.innerHTML =
        "<p style='text-align:center;color:#999'>No books yet. Add one!</p>";
      return;
    }

    list.innerHTML = books
      .map(
        (b) => `
      <div class="book-card">
        <h3>${b.title}</h3>
        <p><strong>Author:</strong> ${b.author} | <strong>Year:</strong> ${
          b.publishedYear
        }</p>
        <p><strong>Genre:</strong> ${b.genre}</p>
        <p>${b.description}</p>
        <div style="margin-top:10px">
          <button onclick='editBook(${JSON.stringify(b).replace(
            /'/g,
            "&apos;"
          )})' 
                  style="background:#f39c12;color:white;border:none;padding:8px 15px;margin:5px;border-radius:5px;cursor:pointer">
            Edit
          </button>
          <button onclick="deleteBook('${b._id}')" 
                  style="background:#e74c3c;color:white;border:none;padding:8px 15px;margin:5px;border-radius:5px;cursor:pointer">
            Delete
          </button>
        </div>
      </div>
    `
      )
      .join("");
  } catch (err) {
    console.error(err);
    document.getElementById("books-list").innerHTML =
      "<p>Failed to load books</p>";
  }
}
checkAuth();
