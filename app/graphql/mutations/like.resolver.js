const { GraphQLString } = require("graphql");
const { StatusCodes } = require("http-status-codes");
const { graphQLverifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { BlogMoldle } = require("../../models/blogs");
const { CoursesModel } = require("../../models/course");
const { ProductsMoldle } = require("../../models/products");
const { responseType } = require("../typeDefs/public.type");
const { CheckExistProduct, CheckExistCourse, CheckExistBlog } = require("../utils");

const LikeProduct = {
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
        let Query = LikedProduct ? {$pull: {likes: user._id}} : {$push: {likes: user._id}};
        await ProductsMoldle.updateOne({_id: productID} , Query);
        if(DisLikedProduct && !LikedProduct) {
            await ProductsMoldle.updateOne({_id: productID} , {$pull: {dislikes: user._id}});
            message = "liked product successfully"
        }else{
            message = "liked product cancel successfully"
        }
        return {
            statusCode: StatusCodes.CREATED,
            data:{
                message
            }
        }
    }
}
const LikeCourse = {
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
        let Query = LikedCourse ? {$pull: {likes: user._id}} : {$push: {likes: user._id}};
        await CoursesModel.updateOne({_id: courseID} , Query);
        if(DisLikedCourse && !LikedCourse) {
            await CoursesModel.updateOne({_id: courseID} , {$pull: {dislikes: user._id}});
            message = "liked course successfully"
        }else{
            message = "liked course cancel successfully"
        }
        return {
            statusCode: StatusCodes.CREATED,
            data:{
                message
            }
        }
    }
}
const LikeBlog = {
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
        let Query = LikedBlog ? {$pull: {likes: user._id}} : {$push: {likes: user._id}};
        await BlogMoldle.updateOne({_id: blogID} , Query);
        if(DisLikedBlog && !LikedBlog) {
            await BlogMoldle.updateOne({_id: blogID} , {$pull: {dislikes: user._id}});
            message = "liked Blog successfully"
        }else{
            message = "liked Blog cancel successfully"
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
    LikeProduct,
    LikeBlog,
    LikeCourse
}