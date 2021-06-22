const express = require('express');

const mongoConnect = require('./database/database').mongoConnect

const booksRoutes = require('./routes/books_routes')

const app = express();

app.use(express.json());

app.use('/api', booksRoutes)

mongoConnect(() => {
    app.listen(8080)
})

