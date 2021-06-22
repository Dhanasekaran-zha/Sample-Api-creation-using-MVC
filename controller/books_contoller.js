const Books = require('../models/books_model')

exports.getAllBooks = (req, res) => {
  Books.getAllBooksfromDB().then(books=>{
      res.send(books)
  })
}

exports.getBookById=(req,res)=>{
    const id=req.params.id;
    Books.getBooksByIdfromDB(id).then(books=>{
        res.send(books)
    })
}

exports.postBook=(req,res)=>{
    const 
}