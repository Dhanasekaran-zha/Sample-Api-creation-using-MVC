const jwt = require('jsonwebtoken')
const createErrors = require('http-errors')

module.exports = {
    signAccessToken: (userid) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const option = {
                expiresIn: "7s",
                issuer: 'Dhana',
                audience: userid
            }
            jwt.sign(payload, secret, option, (err, token) => {
                if (err) {
                    console.log(err)
                    reject(createErrors.InternalServerError())
                }
                resolve(token)
            })
        })
    },

    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createErrors.Unauthorized())

        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    return next(createErrors.Unauthorized())
                } else {
                    return next(createErrors.Unauthorized(err.message))
                }
            }
            req.payload = payload
            next()
        })
    },

    signRefreshToken: (userid) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.REFRESH_TOKEN_SECRET
            const option = {
                expiresIn: "1y",
                issuer: 'Dhana',
                audience: userid
            }
            jwt.sign(payload, secret, option, (err, token) => {
                if (err) {
                    console.log(err)
                    reject(createErrors.InternalServerError())
                }
                resolve(token)
            })
        })
    },

    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if (err) {
                    if (err.name === 'JsonWebTokenError') {
                        return next(createErrors.Unauthorized())
                    } else {
                        return next(createErrors.Unauthorized(err.message))
                    }
                }
                const userId = payload.aud
                resolve(userId)
            })
        })
    }
}