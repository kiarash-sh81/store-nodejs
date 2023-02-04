const Joi = require('@hapi/joi');
const { MongoIdPattern } = require('../../../utils/constans');
const creatError  = require('http-errors');
const createCourseSchema = Joi.object({
    title: Joi.string().min(3).max(60).error(creatError.BadRequest("the title is incorecct")),
    text: Joi.string().error(creatError.BadRequest("text is incorecct")),
    short_text: Joi.string().error(creatError.BadRequest("short text is incorecct")),
    fileName: Joi.string().pattern(/(\.png|\.jpeg|\.jpg|\.webp|\.gif)$/).error(creatError.BadRequest("image that send is incorecct")),
    tags: Joi.array().min(0).max(20).error(creatError.BadRequest("tags can not be over than 30")),
    category: Joi.string().pattern(MongoIdPattern).error(creatError.BadRequest("selected category not founded")),
    price: Joi.number().error(creatError.BadRequest("price is not valid")),
    type: Joi.string().regex(/(free|cash|special)/i),
    discount: Joi.number().error(creatError.BadRequest("discount is not valid")),
    fileUploadPath: Joi.allow()
});

module.exports = {
    createCourseSchema
}