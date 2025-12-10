const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

router.route("/").get(getBooks);

router.route("/").post(protect, createBook);
router
  .route("/:id")
  .get(getBook)
  .put(protect, updateBook)
  .delete(protect, deleteBook);

module.exports = router;
