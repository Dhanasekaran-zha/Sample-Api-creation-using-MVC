const Joi = require('@hapi/joi')

const authSchema = Joi.object({
    email: Joi.string().required().lowercase().email(),
    password: Joi.string().required().min(3)
})

module.exports={authSchema}