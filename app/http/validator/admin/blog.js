const Joi = require('@hapi/joi');
const { MongoIdPattern } = require('../../../utils/constans');
const creatError  = require('http-errors');
const createBlogSchema = Joi.object({
    title: Joi.string().min(3).max(60).error(creatError.BadRequest("the title is incorecct")),
    text: Joi.string().error(creatError.BadRequest("text is incorecct")),
    short_text: Joi.string().error(creatError.BadRequest("short text is incorecct")),
    fileName: Joi.string().pattern(/(\.png|\.jpeg|\.jpg|\.webp|\.gif)$/).error(creatError.BadRequest("image that send is incorecct")),
    tags: Joi.array().min(0).max(20).error(creatError.BadRequest("tags can not be over than 30")),
    category: Joi.string().pattern(MongoIdPattern).error(creatError.BadRequest("selected category not founded")),
    fileUploadPath: Joi.allow()
});
const updateCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(creatError.BadRequest("the title is incorrect"))
});

module.exports = {
    createBlogSchema
}