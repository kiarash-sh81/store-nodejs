const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql");
const { AuthorTypes } = require("./public.type");

const AnswersCommentsParentType =  new GraphQLObjectType({
    name: "CommentsParentType",
    fields:{
        _id: {type: GraphQLString},
        user: {type: AuthorTypes},
        comment: {type: GraphQLString},
        createdAt:{type: GraphQLString}
    }
});
const CommentType =  new GraphQLObjectType({
    name: "CommentType",
    fields:{
        _id: {type: GraphQLString},
        user: {type: AuthorTypes},
        comment: {type: GraphQLString},
        show: {type: GraphQLBoolean},
        openToComment: {type: GraphQLBoolean},
        answers: {type:new GraphQLList(AnswersCommentsParentType)},
        createdAt:{type: GraphQLString}

    }
});

module.exports ={
    CommentType
}