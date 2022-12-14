const Joi = require('@hapi/joi');
const { MongoIdPattern } = require('../../../utils/constans');
const creatError  = require('http-errors');
const createProductSchema = Joi.object({
    title: Joi.string().min(3).max(60).error(creatError.BadRequest("the title is incorecct")),
    text: Joi.string().error(creatError.BadRequest("text is incorecct")),
    short_text: Joi.string().error(creatError.BadRequest("short text is incorecct")),
    colors: Joi.array().min(0).max(10).error(creatError.BadRequest("colors is not correct")),
    fileName: Joi.string().pattern(/(\.png|\.jpeg|\.jpg|\.webp|\.gif)$/).error(creatError.BadRequest("image that send is incorecct")),
    tags: Joi.array().min(0).max(20).error(creatError.BadRequest("tags can not be over than 30")),
    category: Joi.string().pattern(MongoIdPattern).error(creatError.BadRequest("selected category not founded")),
    price: Joi.number().error(creatError.BadRequest("price is not valid")),
    type: Joi.string().regex(/(virtual|phisical)/i),
    count: Joi.number().error(creatError.BadRequest("count is not valid")),
    discount: Joi.number().error(creatError.BadRequest("discount is not valid")),
    weight: Joi.number().empty().allow(null,0,"0").error(creatError.BadRequest("weight is not valid")),
    length: Joi.number().empty().allow(null,0,"0").error(creatError.BadRequest("length is not valid")),
    height: Joi.number().empty().allow(null,0,"0").error(creatError.BadRequest("height is not valid")),
    width: Joi.number().empty().allow(null,0,"0").error(creatError.BadRequest("width is not valid")),
    fileUploadPath: Joi.allow()
});
const updateCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(creatError.BadRequest("the title is incorrect"))
});

module.exports = {
    createProductSchema
}