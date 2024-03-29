const { GraphQLString, GraphQLList, GraphQLObjectType, GraphQLInt } = require("graphql");
const { CommentType } = require("./comment.types");
const { AuthorTypes, CategoryTypes, FeaturesType, PublicCategoryTypes, AnyType } = require("./public.type");

const productTypes = new GraphQLObjectType({
    name: "productTypes",
    fields:{
        _id: {type: GraphQLString},
        title : {type: GraphQLString},
        short_text : {type: GraphQLString},
        text : {type: GraphQLString },
        images : {type:new GraphQLList(GraphQLString)},
        tags : {type: new GraphQLList(GraphQLString)},
        category : {type:PublicCategoryTypes},
        price : {type: GraphQLInt},
        discount : {type: GraphQLInt},
        count : {type: GraphQLInt },
        type : {type: GraphQLString},
        format : {type: GraphQLString},
        suplier : {type: AuthorTypes},
        feature : {type: AnyType},
        comments : {type: new GraphQLList(CommentType)},
        likes:{type : new GraphQLList(AuthorTypes)},
        dislikes:{type : new GraphQLList(AuthorTypes)},

    }
});

module.exports = {
    productTypes
}