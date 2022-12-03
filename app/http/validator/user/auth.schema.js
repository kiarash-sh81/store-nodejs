const Joi = require('@hapi/joi');

const authSchema = new Joi.object({
    phone: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("the internal phone number is not corecct"))
});

const checkOtp = new Joi.object({
    phone: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("the internal phone number is not corecct")),
    code: Joi.string().min(4).max(6).error(new Error("Internal code is incorecct"))
});

module.exports ={
    authSchema,
    checkOtp
}