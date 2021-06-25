const express = require('express');

const mongoConnect = require('./database/database').mongoConnect

const booksRoutes = require('./routes/books_routes')
const mySqlRoutes = require('./routes/mysql_routes')


// mysqldb.execute('SELECT * FROM books').then(resulr => { console.log(resulr[0]) }).catch(err => console.log(err))

const app = express();

app.use(express.json());

app.use('/api', booksRoutes)

app.use('/api/mysql',mySqlRoutes)

mongoConnect(() => {
    app.listen(8080)
})

