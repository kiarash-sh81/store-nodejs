const Joi = require('@hapi/joi');
const createHttpError = require('http-errors');
const { MongoIdPattern } = require('../../utils/constans');

const  ObjectIdValidator = Joi.object({
    id: Joi.string().pattern(MongoIdPattern).error(new Error(createHttpError.BadRequest("the entered id is not correct")))
});

module.exports = {
    ObjectIdValidator
}