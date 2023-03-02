const { GraphQLList, GraphQLString } = require("graphql");
const { CategoryMoldle } = require("../../models/categories");
const { categoryTypes } = require("../typeDefs/category.types");

const categoryResolver = {
    type:new GraphQLList(categoryTypes),
    resolve: async()=>{
        const category = await CategoryMoldle.find({parent: undefined});
        return category
    }
}
const childCategoryResolver = {
    type:new GraphQLList(categoryTypes),
    args:{
        parent: {type: GraphQLString}
    },
    resolve: async(_, args)=>{
        const {parent} = args;
        const category = await CategoryMoldle.find({parent});
        return category
    }
}

module.exports ={
    categoryResolver,
    childCategoryResolver
}