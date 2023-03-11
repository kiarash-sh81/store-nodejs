const {Kind} = require("graphql");
const createHttpError = require("http-errors");
const { BlogMoldle } = require("../models/blogs");
const { CoursesModel } = require("../models/course");
const { ProductsMoldle } = require("../models/products");


function parseObject(valueNode) {
    const value = Object.create(null);
    valueNode.fields.forEach(field => {
        value[field.name.value] = parseValueNode(field.value)
    })
    return value
}
function parseValueNode(valueNode) {
    switch (valueNode.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            return valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT:
            return parseObject(valueNode.value)
        case Kind.LIST:
            return valueNode.values.map(parseValueNode)
        default:
            return null;
    }
}
function parseLiteral(valueNode){
    switch(valueNode.kind) {
        case Kind.STRING:
            return valueNode.value.charAt(0) === '{'? JSON.parse(valueNode.value): valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT: 
                
    }
}


function toObject(value){
    if(typeof value === 'object'){
        return value
    }
    if(typeof value === "string" && value.charAt(0) === "{"){
        return JSON.parse(value)
    }
    return null
}
async function CheckExistBlog(id){
    const blog = await BlogMoldle.findOne({_id: id});
    if(!blog) throw createHttpError.NotFound("blog not founded");
    return blog;
}
async function CheckExistCourse(id){
    const course = await CoursesModel.findOne({_id: id});
    if(!course) throw createHttpError.NotFound("course not founded");
    return course;
}
async function CheckExistProduct(id){
    const product = await ProductsMoldle.findOne({_id: id});
    if(!product) throw createHttpError.NotFound("product not founded");
    return product;
}

module.exports ={
    parseValueNode,
    parseLiteral,
    parseObject,
    toObject,
    CheckExistBlog,
    CheckExistCourse,
    CheckExistProduct
}