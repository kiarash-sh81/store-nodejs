const { GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, GraphQLSchema } = require("graphql");
const { blogResolver } = require("./Queries/blog.resolver");
const { categoryResolver, childCategoryResolver } = require("./Queries/category.resolver");
const { courseResolver } = require("./Queries/course.resolver");
const { productResolver } = require("./Queries/product.resolver");
const rootQuery = new GraphQLObjectType({
    name: "rootQuery",
    fields: {
        blogs: blogResolver,
        products: productResolver,
        category: categoryResolver,
        categoryWithChild: childCategoryResolver,
        courses: courseResolver
    }
});

const rootMutation = new GraphQLObjectType({
    name: "mutation",
    fields: {

    }
});

const graphQlSchema = new GraphQLSchema({
    query: rootQuery,
    // mutation: rootMutation
});

module.exports ={
    graphQlSchema
}