const {Kind} = require("graphql");
const createHttpError = require("http-errors");
const { BlogMoldle } = require("../models/blogs");
const { CoursesModel } = require("../models/course");
const { ProductsMoldle } = require("../models/products");
const { UserMoldle } = require("../models/users");


function parseObject(valueNode) {
    const value = Object.create(null);
    valueNode.fields.forEach(field => {
        value[field.name.value] = parseValueNode(field.value)
    })
    return value
}
function parseValueNode(valueNode) {
    switch (valueNode.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            return valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT:
            return parseObject(valueNode.value)
        case Kind.LIST:
            return valueNode.values.map(parseValueNode)
        default:
            return null;
    }
}
function parseLiteral(valueNode){
    switch(valueNode.kind) {
        case Kind.STRING:
            return valueNode.value.charAt(0) === '{'? JSON.parse(valueNode.value): valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT: 
                
    }
}


function toObject(value){
    if(typeof value === 'object'){
        return value
    }
    if(typeof value === "string" && value.charAt(0) === "{"){
        return JSON.parse(value)
    }
    return null
}
async function CheckExistBlog(id){
    const blog = await BlogMoldle.findOne({_id: id});
    if(!blog) throw createHttpError.NotFound("blog not founded");
    return blog;
}
async function CheckExistCourse(id){
    const course = await CoursesModel.findOne({_id: id});
    if(!course) throw createHttpError.NotFound("course not founded");
    return course;
}
async function CheckExistProduct(id){
    const product = await ProductsMoldle.findOne({_id: id});
    if(!product) throw createHttpError.NotFound("product not founded");
    return product;
}

async function getUserBasket(userID){
    const basketDetail = await UserMoldle.aggregate([
        {
            $match: {
                _id : userID
            },
        },
        {
            $project:{
                basket:1
            },

        },
        {

            $lookup:{
                from: "products",
                localField: "basket.product.productID",
                foreignField: "_id",
                as: "productDetail"
            },
        },
        {
            $lookup:{
                from: "courses",
                localField: "basket.course.courseID",
                foreignField: "_id",
                as: "courseDetail"
            },
        },
        {
            $addFields:{
                "productDetail":{
                    $function:{
                        body: function(productDetail , products){
                            return productDetail.map(function(product){
                                const count = products.find(item =>  item.productID.valueOf() == product._id.valueOf()).count;
                                const totalPrice = products.find(item=> item.productID.valueOf() == product._id.valueOf()).count * product.price
                                return{
                                    ...product,
                                    basketCount: count,
                                    totalPrice,
                                    finalPrice: totalPrice - ((product.discount/100) * totalPrice) 
                                }
                            })         
                        },
                        args: ["$productDetail" , "$basket.product"],
                        lang: "js"
                    }
                }
            }
        },
        {
            $addFields:{
                "courseDetail":{
                    $function:{
                        body: function(courseDetail , courses){
                            return courseDetail.map(function(course){
                                const count = courses.find(item =>  item.courseID.valueOf() == course._id.valueOf()).count;
                                const totalPrice = courses.find(item=> item.courseID.valueOf() == course._id.valueOf()).count * course.price
                                return {
                                    ...course,
                                    basketCount: count,
                                    totalPrice,
                                    finalPrice: totalPrice - ((course.discount/100)*totalPrice)
                                }
                            })
                        },
                        args: ["$courseDetail" , "$basket.course"],
                        lang: "js"
                    }
                },
                "paymentDetail":{
                    $function:{
                        body: function(courseDetail , courses , productDetail , products){
                            const courseAmount = courseDetail.reduce(function(total , course){
                                return total + (course.price - ((course.discount/100) * course.price))
                            } , 0);
                            const productAmount = productDetail.reduce(function(total , product){
                                const count = products.find(item => item.productID.valueOf() == product._id.valueOf()).count;
                                const totalPrice = count * product.price;
                                return total + (totalPrice - ((product.discount/100)*totalPrice));
                            } , 0);
                            const courseIDs = courseDetail.map(course => course._id.valueOf());
                            const productIDs = productDetail.map(product => product._id.valueOf());
                            return{
                                courseAmount,
                                productAmount,
                                paymentAmount : courseAmount + productAmount,
                                courseIDs,
                                productIDs
                            }
                            
                        },
                        args: ["$courseDetail" , "$basket.course" , "$productDetail" , "$basket.product"],
                        lang: "js"
                    }
                }
            }
        },{$project: {basket: 0}}
    ]);

    return basketDetail;
}

module.exports ={
    parseValueNode,
    parseLiteral,
    parseObject,
    toObject,
    CheckExistBlog,
    CheckExistCourse,
    CheckExistProduct,
    getUserBasket
}