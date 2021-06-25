const MySqlBooks = require('../models/mysql_model')


exports.getALLBooksMySQL = (req, res) => {
    MySqlBooks.getAllBooks().then(result=>{
        res.send(result)
    })
}

exports.getBookByIdMySQL=(req,res)=>{
    const id=req.params.id
    MySqlBooks.getBookByID(id).then(result=>{
        res.send(result)
    })
}

exports.postBookMySQL=(req,res)=>{
    const id=MySqlBooks.getAllBooks().length+100+1
    const bookTitle = req.body.title

    MySqlBooks.postBook(id,bookTitle).then(result=>{
        res.send(result)
    })
}

exports.updateBookMySQL=(req,res)=>{
    const bookTitle = req.body.title
    const id=req.params.id

    MySqlBooks.updateBook(id,bookTitle).then(result=>{
        res.send(result)
    })

}

exports.deleteBookMySQL=(req,res)=>{
    const id= req.params.id

    MySqlBooks.deleteBook(id).then(result=>{
        res.send(result)
    })
}
