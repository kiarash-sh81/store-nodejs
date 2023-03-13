const { GraphQLString, GraphQLInt } = require("graphql");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { graphQLverifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { CoursesModel } = require("../../models/course");
const { ProductsMoldle } = require("../../models/products");
const { UserMoldle } = require("../../models/users");
const { copyObject } = require("../../utils/function");
const { responseType } = require("../typeDefs/public.type");
const { CheckExistProduct, CheckExistCourse} = require("../utils");

const AddBasketProduct = {
    type: responseType,
    args:{
        productID : {type: GraphQLString},
    },
    resolve: async(_ , args , context)=>{
        const {req} = context;
        const {productID } = args
        await CheckExistProduct(productID)
        const user = await graphQLverifyAccessToken(req);
        const product  = await findProduct(user._id , productID);
        if(product){
            const increas = await UserMoldle.updateOne(
                {_id: user._id , "basket.product.productID" : productID},
                {$inc:{"basket.product.$.count" : 1}}
            );
            if(!increas.modifiedCount) throw createHttpError.InternalServerError("cant increase count");
        }else{
            const create = await UserMoldle.updateOne(
                {_id: user._id },
                {$push:{"basket.product" : {
                    productID,
                    count: 1
                }}});
                if(!create.modifiedCount) throw createHttpError.InternalServerError("cant add product");
        }
        return {
            statusCode: StatusCodes.OK,
            data:{
                message: "basket update successfully"
            }
        }
    }
}

async function findProduct(userID , productID){
    const Basketproduct = await UserMoldle.findOne({_id: userID , "basket.product.productID" : productID} , {"basket.product.$" : 1});
    const product = copyObject(Basketproduct);
    return product?.basket?.product?.[0];
}
async function findCourse(userID , courseID){
    const Basketcourse = await UserMoldle.findOne({_id: userID , "basket.course.courseID" : courseID} , {"basket.course.$" : 1});
    const detail = copyObject(Basketcourse);
    return detail?.basket?.course?.[0];
}

const AddBasketCourse = {
    type: responseType,
    args:{
        courseID : {type: GraphQLString},
    },
    resolve: async(_ , args , context)=>{
        const {req} = context;
        const {courseID } = args
        await CheckExistCourse(courseID)
        const user = await graphQLverifyAccessToken(req);
        const course  = await findCourse(user._id , courseID);
        
        if(course){
           throw createHttpError.BadRequest("this course has been already in your basket")
        }else{
            const create = await UserMoldle.updateOne(
                {_id: user._id },
                {$push:{"basket.course" : {
                    courseID,
                    count: 1
                }}});
                if(!create.modifiedCount) throw createHttpError.InternalServerError("cant add course");
        }
        return {
            statusCode: StatusCodes.OK,
            data:{
                message: "basket update successfully"
            }
        }
        
    }
}
const removeBasketCourse = {
    type: responseType,
    args:{
        courseID : {type: GraphQLString},
    },
    resolve: async(_ , args , context)=>{
        const {req} = context;
        const {courseID} = args
        await CheckExistCourse(courseID)
        const user = await graphQLverifyAccessToken(req);
        const course  = await findCourse(user._id , courseID);
        if(!course) throw createHttpError.NotFound("course with this detail not founded in basket")
        let message;
        if(course.count > 1){
            const decreas = await UserMoldle.updateOne(
                {_id: user._id , "basket.course.courseID" : courseID},
                {$inc:{"basket.course.$.count" : -1}}
            );
            if(!decreas.modifiedCount) throw createHttpError.InternalServerError("cant decrease count");
            message = "course decrease successfully";
        }else{
            const deleted = await UserMoldle.updateOne(
                {_id: user._id , "basket.course.courseID" : courseID},
                {$pull:{"basket.course" :{courseID}}});
                if(!deleted.modifiedCount) throw createHttpError.InternalServerError("cant delete course");
                message = "course delete successfully"
        }
        return {
            statusCode: StatusCodes.OK,
            data:{
                message
            }
        }
        
    }
}
const removeBasketProduct = {
    type: responseType,
    args:{
        productID : {type: GraphQLString},
    },
    resolve: async(_ , args , context)=>{
        const {req} = context;
        const {productID} = args
        await CheckExistProduct(productID)
        const user = await graphQLverifyAccessToken(req);
        const product  = await findProduct(user._id , productID);
        let message;
        if(!product) throw  createHttpError.NotFound("product with this detail not found in basket")
        if(product.count > 1){
            const decreas = await UserMoldle.updateOne(
                {_id: user._id , "basket.product.productID" : productID},
                {$inc:{"basket.product.$.count" : -1}}
            );
            if(!decreas.modifiedCount) throw createHttpError.InternalServerError("cant decrease count");
            message = "product decrease successfully"
        }else{
            const deleted = await UserMoldle.updateOne(
                {_id: user._id , "basket.product.productID" : productID},
                {$pull:{"basket.product": {productID}}});
                if(!deleted.modifiedCount) throw createHttpError.InternalServerError("cant delete product");
                message = "product deleted successfully"
        }
        return {
            statusCode: StatusCodes.OK,
            data:{
                message
            }
        }
    }
}


module.exports ={
    AddBasketCourse,
    AddBasketProduct,
    removeBasketCourse,
    removeBasketProduct
}