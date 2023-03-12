const { GraphQLList, GraphQLString } = require("graphql");
const { graphQLverifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { BlogMoldle } = require("../../models/blogs")
const { blogTypes } = require("../typeDefs/blogs.types")

const blogResolver = {
    type: new GraphQLList(blogTypes),
    args:{
        category: {type: GraphQLString}
    },
    resolve: async(_ , args , context)=>{
        const {req} = context;
        req.user =await graphQLverifyAccessToken(req);
        const {category} = args;
        const findQuery = category ? {category} : {};
        return await BlogMoldle.find(findQuery).populate([{path: "author"}
         ,{path: "category"} ,
          {path: "comments.user"}, 
          {path: "comments.answers.user"},
          {path: "likes"},  
          {path: "dislikes"},  
          {path: "bookmark"} 
        ]);
    }
}

module.exports = {
    blogResolver
}
