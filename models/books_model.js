const mongodb = require('mongodb');
const getDatabase = require('../database/database').getDatabase;

class Books {

    constructor(bookTitle, bookId) {
        this.bookTitle = bookTitle
        this.bookId = bookId

    }
    static getAllBooksfromDB() {
        const db = getDatabase()
        return db.collection('Books').find({}).toArray().then(books => {
            return books
        }).catch(err => {
            console.log(err)
        });
    }

    static getBooksByIdfromDB(id) {
        const db = getDatabase()
        return db.collection('Books').find({ id: parseInt(id) }).toArray().then(books => {
            if (books.length == 0) {
                return "No Data Found";
            } else {
                return books
            }
        }).catch(err => console.log(err));
    }

    static postBooksToDB(book) {
        const db = getDatabase()
        console.log(book);
        return db.collection('Books').insert(book).then(result => {
            return book
        }).catch(err => console.log(err))
    }

    static updateBookInDB(query, dataSet) {
        const db = getDatabase()
        return db.collection('Books').updateOne(query, dataSet).then(result => {
            return result
        }).catch(err => console.log(err))
    }

    static deleteBookFromDB(id) {
        const db = getDatabase()
        return db.collection('Books').deleteOne({ id: parseInt(id) }).then(result => {
            return result
        }).catch(err => console.log(err))
    }

}

module.exports = Books;
