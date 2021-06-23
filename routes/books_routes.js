const express = require('express');

const router = express.Router();

const booksController = require('../controller/books_contoller');

router.get('/books', booksController.getAllBooks);
router.get('/books/:id', booksController.getBookById);
router.post('/books/add', booksController.postBook);
router.put('/books/update/:id', booksController.updateBook);
router.delete('/books/delete/:id', booksController.deleteBook);


module.exports = router;