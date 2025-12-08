const asyncHandler = require('express-async-handler');
const Book = require('../models/bookModel');

// Get all books (public to logged in users)
const getBooks = asyncHandler (async (req, res) => {
    // For demo: staff could later fetch all; for now return all books
    const books = await Book.find().populate('borrowedBy', 'name email');
    res.status(200).json({ books });
});

// Create book (staff only via route)
const createBook = asyncHandler(async (req, res) => {
    const { title, author, publishedYear, genre, description } = req.body;
    if (!title || !author || !publishedYear || !genre || !description) {
        return res.status(400).json({ message: "Please include all fields" });
    }
    const book = await Book.create({
        title, author, publishedYear, genre, description, user_id: req.user.id
    });
    res.status(201).json({ book });
});

// Get single book
const getBook = asyncHandler (async (req, res) => {
    const book = await Book.findById(req.params.id).populate('borrowedBy', 'name email');
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
});

// Update (staff only via route)
const updateBook = asyncHandler (async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // optional ownership check (staff bypass)
    if (book.user_id.toString() !== req.user.id && req.user.role !== 'staff') {
        return res.status(401).json({ message: "User not authorized" });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json(updatedBook);
});

// Delete (staff only via route)
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.user_id.toString() !== req.user.id && req.user.role !== 'staff') {
    return res.status(401).json({ message: "User not authorized" });
  }

  await Book.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Book removed" });
});

// Borrow
const borrowBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.borrowedBy) return res.status(400).json({ message: "Book already borrowed" });

  book.borrowedBy = req.user.id;
  book.borrowedAt = Date.now();
  await book.save();

  res.status(200).json({ message: "Book borrowed", book });
});

// Return
const returnBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  if (!book.borrowedBy) return res.status(400).json({ message: "Book is not borrowed" });

  if (book.borrowedBy.toString() !== req.user.id && req.user.role !== 'staff') {
    return res.status(401).json({ message: "You are not allowed to return this book" });
  }

  book.borrowedBy = null;
  book.borrowedAt = null;
  await book.save();

  res.status(200).json({ message: "Book returned", book });
});

module.exports = {
    getBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook
};
