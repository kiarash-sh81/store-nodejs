const Joi = require('@hapi/joi');
const { MongoIdPattern } = require('../../../utils/constans');

const addRoleValidation = new Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("title is not correct")),
    permission: Joi.array().items(Joi.string().pattern(MongoIdPattern)).error(new Error("permission is not correct")),
    description: Joi.string().min(0).max(30).error(new Error("description is not correct"))

});
const addPermissionValidation = new Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("title is not correct")),
    description: Joi.string().min(0).max(30).error(new Error("description is not correct"))
});
module.exports={
    addRoleValidation,
    addPermissionValidation
}