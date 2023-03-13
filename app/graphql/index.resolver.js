const { GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, GraphQLSchema } = require("graphql");
const { blogResolver } = require("./Queries/blog.resolver");
const { categoryResolver, childCategoryResolver } = require("./Queries/category.resolver");
const { creatCommentType, creatCommentTypeForCourse, creatCommentTypeForProduct} = require("./mutations/comment.resolver");
const { courseResolver } = require("./Queries/course.resolver");
const { productResolver } = require("./Queries/product.resolver");
const { LikeProduct  , LikeBlog, LikeCourse} = require("./mutations/like.resolver");
const { DisLikeBlog,DisLikeCourse,DisLikeProduct} = require("./mutations/dislike.resolver");
const { BookmarkBlog, BookmarkCourse, BookmarkProduct} = require("./mutations/bookmark.resolver");
const { AddBasketCourse,AddBasketProduct,removeBasketCourse,removeBasketProduct} = require("./mutations/basket.resolver");
const { userBookmarkBlogs,userBookmarkCourse,userBookmarkProduct , getUserBasket } = require("./Queries/user-profile.resolver");
const rootQuery = new GraphQLObjectType({
    name: "rootQuery",
    fields: {
        blogs: blogResolver,
        products: productResolver,
        category: categoryResolver,
        categoryWithChild: childCategoryResolver,
        courses: courseResolver,
        userBookmarkBlogs : userBookmarkBlogs,
        userBookmarkCourse,
        userBookmarkProduct,
        getUserBasket
    }
});

const rootMutation = new GraphQLObjectType({
    name: "mutation",
    fields: {
        creatCommentForBlog : creatCommentType,
        createCommentForCourse : creatCommentTypeForCourse,
        createCommentForProduct: creatCommentTypeForProduct,
        likeProduct: LikeProduct,
        LikeCourse,
        LikeBlog,
        DisLikeCourse,
        DisLikeBlog,
        DisLikeProduct,
        BookmarkBlog,
        BookmarkCourse,
        BookmarkProduct,
        AddBasketProduct,
        AddBasketCourse,
        removeBasketCourse,
        removeBasketProduct
    }
});

const graphQlSchema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
});

module.exports ={
    graphQlSchema
}