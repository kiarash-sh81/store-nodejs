const Joi = require('@hapi/joi');

const authSchema = new Joi.object({
    phone: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("the internal phone number is not corecct"))
});

module.exports ={
    authSchema
}