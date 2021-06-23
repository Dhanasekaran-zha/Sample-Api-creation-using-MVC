const Books = require('../models/books_model')

exports.getAllBooks = (req, res) => {
    Books.getAllBooksfromDB().then(books => {
        res.send(books)
    })
}

exports.getBookById = (req, res) => {
    const id = req.params.id;
    Books.getBooksByIdfromDB(id).then(books => {
        res.send(books)
    })
}

exports.postBook = (req, res) => {
    Books.getAllBooksfromDB().then(books => {
        const bookTitle = req.body.title
        const bookId = books.length + 1 + 100
        const book = {
            id: bookId,
            title: bookTitle
        };
        console.log(book);
        Books.postBooksToDB(book).then(book => {
            res.send(book)
        })
    })

}

exports.updateBook = (req, res) => {
    let query = { id: parseInt(req.params.id) };
    let book = {
        id: parseInt(req.params.id),
        title: req.body.title
    };
    let dataSet = {
        $set: book
    };
    Books.updateBookInDB(query, dataSet).then(result => {
        res.send(book)
    })

}
exports.deleteBook = (req, res) => {
    const id = req.params.id;
    Books.deleteBookFromDB(id).then(result => {
        res.send(result)
    })
}