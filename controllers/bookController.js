const asyncHandler = require('express-async-handler');
const Book = require('../models/bookModel');

//@desc Get all books
//@route GET /api/books
//@access private
const getBooks = asyncHandler (async (req, res) => {
    const books = await Book.find(user_id=req.user.id);
    res.status(200).json({books});
});

//@desc Create New book
//@route POST /api/books
//@access private
const createBook = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    const { title, author, publishedYear, genre, description } = req.body;
    if (!title || !author || !publishedYear || !genre || !description) {
        return res.status(400).json({ message: "Please include all fields" });
    }
    const book = await Book.create({
        title,
        author,
        publishedYear,
        genre,
        description,
        user_id: req.user.id
    });
    res.status(201).json({ book });
});


//@desc Get book
//@route GET /api/books/:id
//@access private
const getBook = asyncHandler (async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }   
    res.status(200).json(book);
});

//@desc Update book
//@route PUT /api/books/:id
//@access private
const updateBook = asyncHandler (async (req, res) => {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBook);
    //  
    res.status(200).json(updatedBook);
});
//@desc Delete book
//@route DELETE /api/books/:id
//@access private
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.status(200).json(book);
});


module.exports = {
    getBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
};