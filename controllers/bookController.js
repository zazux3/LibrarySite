//@desc Get all books
//@route GET /api/books
//@access Public
const getBooks = (req, res) => {
    res.status(200).json({message: "Get List of books"});
};

//@desc Create New book
//@route POST /api/books
//@access Public
const createBook = (req, res) => {
    console.log("The request body is:", req.body);
    const { title, author, isbn } = req.body;
    if (!title || !author || !isbn) {
        return res.status(400).json({message: "Please include all fields"});
    }   
    res.status(201).json({message: "Add New Book"});
};

//@desc Get book
//@route GET /api/books/:id
//@access Public
const getBook = (req, res) => {
    res.status(200).json({message: `Get book for ${req.params.id}`});
};

//@desc Update book
//@route PUT /api/books/:id
//@access Public
const updateBook = (req, res) => {
    res.status(200).json({message: `Update book for ${req.params.id}`});
};

//@desc Delete book
//@route DELETE /api/books/:id
//@access Public
const deleteBook = (req, res) => {
    res.status(200).json({message: `Delete book for ${req.params.id}`});
};  



module.exports = {
    getBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
};