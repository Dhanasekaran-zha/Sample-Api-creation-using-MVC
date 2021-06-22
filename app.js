const express = require('express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var objectID = mongodb.ObjectID;

const app = express();

app.use(express.json());

var database;

app.get('/', (req, res) => {
    res.send('Welcomeeeeeeeee');
});

app.get('/api/books', (req, res) => {
    database.collection('Books').find({}).toArray((err, result) => {
        if (err) throw err
        res.send(result);
    });
});

app.get('/api/books/:id', (req, res) => {
    database.collection('Books').find({ id: parseInt(req.params.id) }).toArray((err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length == 0) {
                res.send("No Data Found");
            } else { res.send(result); }
        }
    });
});

app.post('/api/books/addBook', (req, res) => {
    database.collection('Books').find({}).toArray((err, result) => {
        if (err) {
            throw err;
        } else {
            const book = {
                id: result.length + 1 + 100,
                title: req.body.title
            };
            database.collection('Books').insert(book, (error, record) => {
                if (error) {
                    console.log(error)
                } else {
                    res.send(book);
                }
            });

        }
    });
});

app.put('/api/books/:id', (req, res) => {
    let query = { id: parseInt(req.params.id) };
    let book = {
        id: parseInt(req.params.id),
        title: req.body.title
    };
    let dataSet = {
        $set: book
    };
    database.collection('Books').updateOne(query, dataSet, (err, result) => {
        if (err) throw err
        res.send(book);
    });
});

app.delete('/api/books/:id', (req, res) => {
    database.collection('Books').find({ id: parseInt(req.params.id) }).toArray((err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length == 0) {
                res.send("No Data Found");
            } else {
                database.collection('Books').deleteOne({ id: parseInt(req.params.id) }, (err, record) => {
                    if (err) throw err
                    res.send(result);
                })
            }
        }
    });
});

app.listen(8080, () => {
    MongoClient.connect('mongodb+srv://myself:myself@cluster0.uohkc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }, (error, result) => {
        if (error) throw error
        database = result.db('MyFirstAPI');
        console.log('Connection Successful');
    });
});

