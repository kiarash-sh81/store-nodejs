const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLScalarType } = require("graphql");
const { toObject, parseLiteral } = require("../utils");

const AnyType = new GraphQLScalarType({
    name: "anyType",
    parseValue : toObject,
    serialize : toObject,
    parseLiteral : parseLiteral,
})

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

const responseType = new GraphQLObjectType({
    name: "responseType",
    fields: {
        statusCode: {type: GraphQLString},
        data: {type: AnyType}
    }
})

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
    FeaturesType,
    AnyType,
    responseType
}