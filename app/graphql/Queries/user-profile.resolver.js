const { GraphQLList } = require("graphql");
const { StatusCodes } = require("http-status-codes");
const { graphQLverifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { BlogMoldle } = require("../../models/blogs");
const { CoursesModel } = require("../../models/course");
const { ProductsMoldle } = require("../../models/products");
const { UserMoldle } = require("../../models/users");
const { blogTypes } = require("../typeDefs/blogs.types");
const { courseTypes } = require("../typeDefs/course.types");
const { productTypes } = require("../typeDefs/products.types");
const { AnyType } = require("../typeDefs/public.type");

const userBookmarkBlogs = {
    type: new GraphQLList(blogTypes),
    args:{
        
    },
    resolve: async(_ , args , context)=>{
        const {req} = context;
        const user =await graphQLverifyAccessToken(req);
        const blogs = await BlogMoldle.find({bookmark: user._id}).populate([{path: "author"}
        ,{path: "category"} ,
         {path: "comments.user"}, 
         {path: "comments.answers.user"},
         {path: "likes"},  
         {path: "dislikes"},  
         {path: "bookmark"} 
       ]);
        return blogs
    }
}
const userBookmarkCourse = {
    type: new GraphQLList(courseTypes),
    args:{
        
    },
    resolve: async(_ , args , context)=>{
        const {req} = context;
        const user =await graphQLverifyAccessToken(req);
        const course = await CoursesModel.find({bookmarks: user._id}).populate([{path: "teacher"} , {path: "category"},
        {path: "comments.user"}, 
        {path: "comments.answers.user"},
        {path: "likes"},  
        {path: "dislikes"},  
        {path: "bookmarks"}  
    ]);;
        return course
    }
}
const userBookmarkProduct = {
    type: new GraphQLList(productTypes),
    args:{
        
    },
    resolve: async(_ , args , context)=>{
        const {req} = context;
        const user =await graphQLverifyAccessToken(req);
        const product = await ProductsMoldle.find({bookmarks: user._id}).populate([{path: "suplier"} , {path: "category"},
        {path: "comments.user"}, 
        {path: "comments.answers.user"},
        {path: "likes"},  
        {path: "dislikes"},  
        {path: "bookmarks"}]);
        return product
    }
}
const getUserBasket = {
    type: AnyType,
    args:{
        
    },
    resolve: async(_ , args , context)=>{
        const {req} = context;
        const user =await graphQLverifyAccessToken(req);
        const basketDetail = await UserMoldle.aggregate([
            {
                $match: {
                    _id : user._id
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
        return basketDetail
    }
}

module.exports ={
    userBookmarkBlogs,
    userBookmarkCourse,
    userBookmarkProduct,
    getUserBasket
}
