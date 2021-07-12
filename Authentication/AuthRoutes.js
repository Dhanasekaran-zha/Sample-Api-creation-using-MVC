const express = require('express')
const createErrors = require('http-errors')
const router = express.Router()


const User = require('./UserModel')
const { authSchema } = require('./ValidationSchema')
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('./JWTHelper')




router.post('/login', async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body)

        const user = await User.findOne({ email: result.email })

        if (!user) throw createErrors.NotFound('User Not Registered')

        const isMatch = await user.isValidPassword(result.password)

        if (!isMatch) throw createErrors.Unauthorized('Username / Password Invalid')


        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id)

        res.send({ accessToken, refreshToken })

    } catch (error) {
        if (error.isJoi === true) return next(createErrors.BadRequest("Invalid Username/Password"))
        next(error)
    }
})


router.post('/register', async (req, res, next) => {
    try {

        const result = await authSchema.validateAsync(req.body)

        const emailExists = await User.findOne({ email: result.email })
        if (emailExists) throw createErrors.Conflict(`${result.email} exists`)

        const user = new User(result)

        const saveduser = await user.save()

        const accessToken = await signAccessToken(saveduser.id)
        const refreshToken = await signRefreshToken(saveduser.id)

        res.send({ accessToken, refreshToken })

    } catch (error) {
        if (error.isJoi === true) error.status = 422
        next(error)
    }
})


router.post('/refresh-token', async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createErrors.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)

        const accessToken = await signAccessToken(userId)
        const newrefreshToken = await signRefreshToken(userId)

        res.send({ accessToken:accessToken,refreshToken: newrefreshToken })
    } catch (error) {
        next(error)
    }
})


router.delete('/logout', async (req, res, next) => {
    res.send("logout")
})



module.exports = router