const { GraphQLList } = require("graphql")
const { ProductsMoldle } = require("../../models/products");
const { productTypes } = require("../typeDefs/products.types");

const productResolver = {
    type: new GraphQLList(productTypes),
    resolve: async()=>{
        return await ProductsMoldle.find({}).populate([{path: "suplier"} , {path: "category"}]);
    }
}

module.exports = {
    productResolver
}
