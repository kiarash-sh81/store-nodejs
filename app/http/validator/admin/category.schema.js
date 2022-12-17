const Joi = require('@hapi/joi');
const { MongoIdPattern } = require('../../../utils/constans');

const addcategorySchema = new Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("title is not correct")),
    parent: Joi.string().allow('').pattern(MongoIdPattern).allow("").error(new Error("parent is not correct"))
});

module.exports={
    addcategorySchema
}
