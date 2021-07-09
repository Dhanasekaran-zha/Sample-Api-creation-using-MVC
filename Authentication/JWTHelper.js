const jwt = require('jsonwebtoken')
const createErrors = require('http-errors')

module.exports = {
    signAccessToken: (userid) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = "dhana"
            const option = {
                expiresIn:"1h",
                issuer:'Dhana',
                audience:userid
            }
            jwt.sign(payload, secret, option, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    }
}