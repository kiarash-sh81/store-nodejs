const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { PublicCategoryTypes, AnyType } = require("./public.type");

const categoryTypes = new GraphQLObjectType({
    name: "categoryTypes",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        children:{type: new GraphQLList(AnyType)}
    }
});


module.exports ={
    categoryTypes
}