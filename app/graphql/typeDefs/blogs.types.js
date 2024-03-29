const { GraphQLString, GraphQLList, GraphQLObjectType } = require("graphql");
const { CommentType } = require("./comment.types");
const { AuthorTypes, CategoryTypes, PublicCategoryTypes } = require("./public.type");

const blogTypes = new GraphQLObjectType({
    name: "blogTypes",
    fields:{
        _id: {type: GraphQLString},
        title : {type: GraphQLString},
        author : {type: AuthorTypes},
        short_text : {type: GraphQLString},
        text : {type: GraphQLString },
        image : {type: GraphQLString},
        tags : {type: new GraphQLList(GraphQLString)},
        category : {type: new GraphQLList(PublicCategoryTypes)},
        comments:{type : new GraphQLList(CommentType)},
        dislikes:{type : new GraphQLList(AuthorTypes)},
        likes:{type : new GraphQLList(AuthorTypes)},
        bookmark: {type : new GraphQLList(AuthorTypes)}
    }
});

module.exports = {
    blogTypes
}