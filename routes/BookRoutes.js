const express = require('express');
const router = express.Router();
const {
  getBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook
} = require('../controllers/bookController');

const validateTokenHandler = require('../middleware/validateTokenHandler');
const authorizeRoles = require('../middleware/authorizeRoles');

router.get('/', validateTokenHandler, getBooks);
router.get('/:id', validateTokenHandler, getBook);

// Staff-only: create/update/delete
router.post('/', validateTokenHandler, authorizeRoles('staff'), createBook);
router.put('/:id', validateTokenHandler, authorizeRoles('staff'), updateBook);
router.delete('/:id', validateTokenHandler, authorizeRoles('staff'), deleteBook);

// Borrow / Return (any authenticated user)
router.post('/:id/borrow', validateTokenHandler, borrowBook);
router.post('/:id/return', validateTokenHandler, returnBook);

module.exports = router;
