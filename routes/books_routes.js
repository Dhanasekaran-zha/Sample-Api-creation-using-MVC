const express = require('express');

const router = express.Router();

const booksController = require('../controller/books_contoller');

router.get('/books', booksController.getAllBooks);
router.get('/books/:id', booksController.getBookById);
router.post('books/add', booksController.postBook);

module.exports = router;