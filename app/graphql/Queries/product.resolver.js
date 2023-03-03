const { GraphQLList, GraphQLString } = require("graphql")
const { ProductsMoldle } = require("../../models/products");
const { productTypes } = require("../typeDefs/products.types");

const productResolver = {
    type: new GraphQLList(productTypes),
    args:{
        category: {type: GraphQLString}
    },
    resolve: async(_, args)=>{
        const {category} = args;
        const findQuery = category ? {category} : {};
        return await ProductsMoldle.find(findQuery).populate([{path: "suplier"} , {path: "category"}]);
    }
}

module.exports = {
    productResolver
}
