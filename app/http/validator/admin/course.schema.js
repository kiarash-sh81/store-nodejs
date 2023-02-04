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
const createEpisodeSchema = Joi.object({
    title: Joi.string().min(3).max(60).error(creatError.BadRequest("the title is incorecct")),
    text: Joi.string().error(creatError.BadRequest("text is incorecct")),
    type: Joi.string().regex(/lock|unlock/i),
    courseID: Joi.string().pattern(MongoIdPattern).error(creatError.BadRequest("selected course is not correct")),
    chapterID: Joi.string().pattern(MongoIdPattern).error(creatError.BadRequest("selected chapter is not correct")),
    fileUploadPath: Joi.allow(),
    fileName: Joi.string().pattern(/(\.mov|\.mp4|\.mpg|\.avi|\.mkv)$/).error(creatError.BadRequest("image that send is incorecct"))
});

module.exports = {
    createCourseSchema,
    createEpisodeSchema
}