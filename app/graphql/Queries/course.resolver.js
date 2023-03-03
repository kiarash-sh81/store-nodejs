const { GraphQLList } = require("graphql");
const { CoursesModel } = require("../../models/course");
const { courseTypes } = require("../typeDefs/course.types");

const courseResolver = {
    type: new GraphQLList(courseTypes),
    resolve: async()=>{
        return await CoursesModel.find({}).populate([{path: "teacher"} , {path: "category"}]);
    }
}

module.exports = {
    courseResolver
}
