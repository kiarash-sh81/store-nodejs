const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { PublicCategoryTypes } = require("./public.type");

const categoryTypes = new GraphQLObjectType({
    name: "categoryTypes",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        children:{type: new GraphQLList(PublicCategoryTypes)}
    }
});


module.exports ={
    categoryTypes
}