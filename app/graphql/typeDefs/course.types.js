const { GraphQLString, GraphQLList, GraphQLObjectType, GraphQLInt } = require("graphql");
const { AuthorTypes, CategoryTypes, FeaturesType, PublicCategoryTypes, AnyType } = require("./public.type");

const episodesTypes = new GraphQLObjectType({
    name: "episodesTypes",
    fields:{
        _id: {type: GraphQLString},
        title : {type: GraphQLString},
        text : {type: GraphQLString },
        type : {type:GraphQLString},
        time : {type:GraphQLString},
        videoAddress : {type:GraphQLString},
        videoURL: {type:GraphQLString}
    }
});
const chapterTypes = new GraphQLObjectType({
    name: "chapterTypes",
    fields:{
        _id: {type: GraphQLString},
        title : {type: GraphQLString},
        text : {type: GraphQLString },
        episodes : {type:new GraphQLList(episodesTypes)},
    }
});
const courseTypes = new GraphQLObjectType({
    name: "courseTypes",
    fields:{
        _id: {type: GraphQLString},
        title : {type: GraphQLString},
        short_text : {type: GraphQLString},
        text : {type: GraphQLString },
        images : {type:GraphQLString},
        imageURL : {type:GraphQLString},
        tags : {type: new GraphQLList(GraphQLString)},
        category : {type:PublicCategoryTypes},
        price : {type: GraphQLInt},
        discount : {type: GraphQLInt},
        type : {type: GraphQLString},
        status : {type: GraphQLString},
        time : {type: GraphQLString},
        teacher : {type: AuthorTypes},
        chapters : {type: new GraphQLList(chapterTypes)},
    }
});

module.exports = {
    courseTypes
}