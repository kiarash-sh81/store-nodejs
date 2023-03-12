const { GraphQLString } = require("graphql");
const { StatusCodes } = require("http-status-codes");
const { graphQLverifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { BlogMoldle } = require("../../models/blogs");
const { CoursesModel } = require("../../models/course");
const { ProductsMoldle } = require("../../models/products");
const { responseType } = require("../typeDefs/public.type");
const { CheckExistProduct, CheckExistCourse, CheckExistBlog } = require("../utils");

const BookmarkProduct = {
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
        const bookmarkProduct = await ProductsMoldle.findOne({_id: productID , bookmarks: user._id});
        let Query = bookmarkProduct ? {$pull: {bookmarks: user._id}} : {$push: {bookmarks: user._id}};
        await ProductsMoldle.updateOne({_id: productID} , Query);
        if(!bookmarkProduct) {
            message = "bookmark product successfully"
        }else{
            message = "bookmark product cancel successfully"
        }
        return {
            statusCode: StatusCodes.CREATED,
            data:{
                message
            }
        }
    }
}
const BookmarkCourse = {
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
        const bookmarkCourse = await CoursesModel.findOne({_id: courseID , bookmarks: user._id});
        let Query = bookmarkCourse ? {$pull: {bookmarks: user._id}} : {$push: {bookmarks: user._id}};
        await CoursesModel.updateOne({_id: courseID} , Query);
        if(!bookmarkCourse) {
            message = "bookmark course successfully"
        }else{
            message = "bookmark course cancel successfully"
        }
        return {
            statusCode: StatusCodes.CREATED,
            data:{
                message
            }
        }
    }
}
const BookmarkBlog = {
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
        const bookmarkBlog = await BlogMoldle.findOne({_id: blogID , bookmark: user._id});
        let Query = bookmarkBlog ? {$pull: {bookmark: user._id}} : {$push: {bookmark: user._id}};
        await BlogMoldle.updateOne({_id: blogID} , Query);
        if(!bookmarkBlog) {
            message = "bookmark Blog successfully"
        }else{
            message = "bookmark Blog cancel successfully"
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
    BookmarkBlog,
    BookmarkCourse,
    BookmarkProduct
}