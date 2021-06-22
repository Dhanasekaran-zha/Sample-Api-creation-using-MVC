const mongodb = require('mongodb');
const getDatabase = require('../database/database').getDatabase;

class Books {
    static getAllBooksfromDB() {
        const db = getDatabase()
        return db.collection('Books').find({}).toArray().then(books => {
            return books
        }).catch(err => {
            console.log(err)
        });
    }

    static getBooksByIdfromDB(id){
        const db = getDatabase()
        return db.collection('Books').find({ id: parseInt(id) }).toArray().then(books=>{
            if (books.length == 0) {
                return "No Data Found";
            }else{
                return books
            }
        }).catch(err=>console.log(err));
    }
}

module.exports = Books;
