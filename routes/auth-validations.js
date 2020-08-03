const Joi = require("@hapi/joi")

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
        status: Joi.string().min(6).max(255),
        nickname: Joi.string().min(6).max(255),
    })
    return schema.validate(data)
}
const loginValidation = (data) => {
    const schema = Joi.object({
        // name: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    })
    return schema.validate(data)
}

module.exports = {
    registerValidation,
    loginValidation,
}