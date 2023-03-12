const { GraphQLList } = require("graphql");
const { StatusCodes } = require("http-status-codes");
const { graphQLverifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { BlogMoldle } = require("../../models/blogs");
const { CoursesModel } = require("../../models/course");
const { ProductsMoldle } = require("../../models/products");
const { blogTypes } = require("../typeDefs/blogs.types");
const { courseTypes } = require("../typeDefs/course.types");
const { productTypes } = require("../typeDefs/products.types");

const userBookmarkBlogs = {
    type: new GraphQLList(blogTypes),
    args:{
        
    },
    resolve: async(_ , args , context)=>{
        const {req} = context;
        const user =await graphQLverifyAccessToken(req);
        const blogs = await BlogMoldle.find({bookmark: user._id}).populate([{path: "author"}
        ,{path: "category"} ,
         {path: "comments.user"}, 
         {path: "comments.answers.user"},
         {path: "likes"},  
         {path: "dislikes"},  
         {path: "bookmark"} 
       ]);
        return blogs
    }
}
const userBookmarkCourse = {
    type: new GraphQLList(courseTypes),
    args:{
        
    },
    resolve: async(_ , args , context)=>{
        const {req} = context;
        const user =await graphQLverifyAccessToken(req);
        const course = await CoursesModel.find({bookmarks: user._id}).populate([{path: "teacher"} , {path: "category"},
        {path: "comments.user"}, 
        {path: "comments.answers.user"},
        {path: "likes"},  
        {path: "dislikes"},  
        {path: "bookmarks"}  
    ]);;
        return course
    }
}
const userBookmarkProduct = {
    type: new GraphQLList(productTypes),
    args:{
        
    },
    resolve: async(_ , args , context)=>{
        const {req} = context;
        const user =await graphQLverifyAccessToken(req);
        const product = await ProductsMoldle.find({bookmarks: user._id}).populate([{path: "suplier"} , {path: "category"},
        {path: "comments.user"}, 
        {path: "comments.answers.user"},
        {path: "likes"},  
        {path: "dislikes"},  
        {path: "bookmarks"}]);
        return product
    }
}

module.exports ={
    userBookmarkBlogs,
    userBookmarkCourse,
    userBookmarkProduct
}
