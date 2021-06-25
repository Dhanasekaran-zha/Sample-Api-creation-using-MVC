const mysqldb = require('../database/mysql')

class MySqlBooks {

    static getAllBooks(){
        return mysqldb.execute("SELECT * FROM books").then(([data,dataset])=>{
            return data
        }).catch(err=>console.log(err))
    }

    static getBookByID(id){
        return mysqldb.execute("SELECT * FROM books WHERE id=?",[id]).then(([data,dataset])=>{
            if(data.length==0){
                return "NO DATA FOUND"
            }else{
            return data
            }
        }).catch(err=>console.log(err))
    }

    static postBook(id,bookTitle){
        return mysqldb.execute("INSERT INTO books (id,title) VALUES (?,?)",[id,bookTitle]).then(([data,datase])=>{
            return data
        }).catch(err=>console.log(err))
    }

    static updateBook(id,bookTitle){
        return mysqldb.execute("UPDATE books set title=? WHERE id=?",[bookTitle,id]).then(([data,dataset])=>{
            return data
        }).catch(err=>console.log(err))
    }

    static deleteBook(id){
        return mysqldb.execute("DELETE FROM books WHERE id=?",[id]).then(([data,dataset])=>{
            return data
        }).catch(err=>console.log(err))
    }
}

module.exports = MySqlBooks;
