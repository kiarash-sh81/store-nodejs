const { GraphQLList } = require("graphql")
const { BlogMoldle } = require("../../models/blogs")
const { blogTypes } = require("../typeDefs/blogs.types")

const blogResolver = {
    type: new GraphQLList(blogTypes),
    resolve: async()=>{
        return await BlogMoldle.find({}).populate([{path: "author"} , {path: "category"}]);
    }
}

module.exports = {
    blogResolver
}
