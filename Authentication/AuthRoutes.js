const express = require('express')
const createErrors = require('http-errors')
const router = express.Router()


const User = require('./UserModel')
const { authSchema } = require('./ValidationSchema')
const { signAccessToken } = require('./JWTHelper')




router.post('/login', async (req, res, next) => {
    res.send("Login")
})


router.post('/register', async (req, res, next) => {
    try {

        // const { email, password } = req.body
        // if (!email, !password) throw createErrors.BadRequest()

        const result = await authSchema.validateAsync(req.body)

        const emailExists = await User.findOne({ email: result.email })
        if (emailExists) throw createErrors.Conflict(`${result.email} exists`)

        const user = new User(result)

        const saveduser = await user.save()

        const accessToken= await signAccessToken(saveduser.id)

        res.send({accessToken})

    } catch (error) {
        if(error.isJoi === true)error.status = 422
        next(error)
    }
})


router.post('/refresh-token', async (req, res, next) => {
    res.send("refresh-token")
})


router.delete('/logout', async (req, res, next) => {
    res.send("logout")
})



module.exports = router