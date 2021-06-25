const express = require('express');

const router = express.Router();

const mySqlController = require('../controller/mysql_controller');



router.get('/books', mySqlController.getALLBooksMySQL);
router.get('/books/:id', mySqlController.getBookByIdMySQL);
router.post('/books/add', mySqlController.postBookMySQL);
router.put('/books/update/:id', mySqlController.updateBookMySQL);
router.delete('/books/delete/:id', mySqlController.deleteBookMySQL);


module.exports = router;