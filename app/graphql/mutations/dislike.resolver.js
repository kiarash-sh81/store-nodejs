const { GraphQLString } = require("graphql");
const { StatusCodes } = require("http-status-codes");
const { graphQLverifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { BlogMoldle } = require("../../models/blogs");
const { CoursesModel } = require("../../models/course");
const { ProductsMoldle } = require("../../models/products");
const { responseType } = require("../typeDefs/public.type");
const { CheckExistProduct, CheckExistCourse, CheckExistBlog } = require("../utils");

const DisLikeProduct = {
    type: responseType,
    args:{
        productID : {type: GraphQLString}
    },
    resolve: async(_ , args , context)=>{
        const {req} = context;
        const {productID} = args
        await CheckExistProduct(productID)
        const user = await graphQLverifyAccessToken(req);
        let message = ""
        const LikedProduct = await ProductsMoldle.findOne({_id: productID , likes: user._id});
        const DisLikedProduct = await ProductsMoldle.findOne({_id: productID , dislikes: user._id});
        let Query = DisLikedProduct ? {$pull: {dislikes: user._id}} : {$push: {dislikes: user._id}};
        await ProductsMoldle.updateOne({_id: productID} , Query);
        if(!DisLikedProduct) {
            if(LikedProduct) await ProductsMoldle.updateOne({_id: productID} , {$pull: {likes: user._id}});
            message = "disliked product successfully"
        }else{
            message = "disliked product cancel successfully"
        }
        return {
            statusCode: StatusCodes.CREATED,
            data:{
                message
            }
        }
    }
}
const DisLikeCourse = {
    type: responseType,
    args:{
        courseID : {type: GraphQLString}
    },
    resolve: async(_ , args , context)=>{
        const {req} = context;
        const {courseID} = args
        await CheckExistCourse(courseID)
        const user = await graphQLverifyAccessToken(req);
        let message = ""
        const LikedCourse = await CoursesModel.findOne({_id: courseID , likes: user._id});
        const DisLikedCourse = await CoursesModel.findOne({_id: courseID , dislikes: user._id});
        let Query = DisLikedCourse ? {$pull: {dislikes: user._id}} : {$push: {dislikes: user._id}};
        await CoursesModel.updateOne({_id: courseID} , Query);
        if(!DisLikedCourse) {
            if(LikedCourse) await CoursesModel.updateOne({_id: courseID} , {$pull: {likes: user._id}});
            message = "disliked course successfully"
        }else{
            message = "disliked course cancel successfully"
        }
        return {
            statusCode: StatusCodes.CREATED,
            data:{
                message
            }
        }
    }
}
const DisLikeBlog = {
    type: responseType,
    args:{
        blogID : {type: GraphQLString}
    },
    resolve: async(_ , args , context)=>{
        const {req} = context;
        const {blogID} = args
        await CheckExistBlog(blogID)
        const user = await graphQLverifyAccessToken(req);
        let message = "";
        const LikedBlog = await BlogMoldle.findOne({_id: blogID , likes: user._id});
        const DisLikedBlog = await BlogMoldle.findOne({_id: blogID , dislikes: user._id});
        let Query = DisLikedBlog ? {$pull: {dislikes: user._id}} : {$push: {dislikes: user._id}};
        await BlogMoldle.updateOne({_id: blogID} , Query);
        if(!DisLikedBlog) {
            if(LikedBlog) await BlogMoldle.updateOne({_id: blogID} , {$pull: {likes: user._id}});
            message = "disliked Blog successfully"
        }else{
            message = "disliked Blog cancel successfully"
        }
        return {
            statusCode: StatusCodes.CREATED,
            data:{
                message
            }
        }
    }
}

module.exports ={
    DisLikeBlog,
    DisLikeCourse,
    DisLikeProduct
}