const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");

const AuthorTypes = new GraphQLObjectType({
    name: "AuthorTypes",
    fields:{
        _id: {type: GraphQLString},
        last_name: {type: GraphQLString},
        first_name: {type: GraphQLString},
    }
});
const PublicCategoryTypes = new GraphQLObjectType({
    name: "PublicCategoryTypes",
    fields:{
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
    }
});

const FeaturesType = new GraphQLObjectType({
    name: "FeaturesType",
    fields:{
        length:GraphQLInt,
        height:GraphQLInt,
        wedth:GraphQLInt,
        weight:GraphQLInt,
        colors:new GraphQLList(GraphQLString),
        // model:new GraphQLList(GraphQLString),
        // madein: GraphQLString
    }
})

module.exports = {
    AuthorTypes,
    PublicCategoryTypes,
    FeaturesType
}