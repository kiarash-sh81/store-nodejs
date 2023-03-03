const { GraphQLList, GraphQLString } = require("graphql");
const { CoursesModel } = require("../../models/course");
const { courseTypes } = require("../typeDefs/course.types");

const courseResolver = {
    type: new GraphQLList(courseTypes),
    args:{
        category : {type: GraphQLString}
    },
    resolve: async(_,args)=>{
        const {category} = args;
        const findQuery = category ? {category} : {};
        return await CoursesModel.find(findQuery).populate([{path: "teacher"} , {path: "category"}]);
    }
}

module.exports = {
    courseResolver
}
