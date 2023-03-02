const { GraphQLList } = require("graphql");
const { graphQLverifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { BlogMoldle } = require("../../models/blogs")
const { blogTypes } = require("../typeDefs/blogs.types")

const blogResolver = {
    type: new GraphQLList(blogTypes),
    resolve: async(_ , args , context)=>{
        const {req} = context;
        req.user =await graphQLverifyAccessToken(req);
        return await BlogMoldle.find({}).populate([{path: "author"} , {path: "category"}]);
    }
}

module.exports = {
    blogResolver
}
