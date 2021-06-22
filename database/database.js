const mongodb =require('mongodb')
const MongoClient=mongodb.MongoClient

let database

const mongoConnect=(callback)=>{
    MongoClient.connect('mongodb+srv://myself:myself@cluster0.uohkc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }, (error, result) => {
        if (error) throw error
        database = result.db('MyFirstAPI');
        console.log('Connection Successful');
        callback()
    });
}

const getDatabase=()=>{
    if(database){
        return database
    }else{
        throw 'No Database Found'
    }
}

exports.mongoConnect=mongoConnect
exports.getDatabase=getDatabase