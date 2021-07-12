const express = require('express')
const morgan = require('morgan')
const createErrors = require('http-errors')
require('dotenv').config()

const authRoutes = require('./Authentication/AuthRoutes')
require('./database/authdb')

const { verifyAccessToken } = require('./Authentication/JWTHelper')


const app = express()

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', verifyAccessToken, async (req, res, next) => {
    res.send("Hello")
})

app.use('/auth', authRoutes)

app.use(async (req, res, next) => {

    next(createErrors.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})