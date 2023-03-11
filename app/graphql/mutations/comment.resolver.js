const { GraphQLString } = require("graphql");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { graphQLverifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { BlogMoldle } = require("../../models/blogs");
const { CoursesModel } = require("../../models/course");
const { ProductsMoldle } = require("../../models/products");
const { copyObject } = require("../../utils/function");
const { CommentType } = require("../typeDefs/comment.types");
const { responseType } = require("../typeDefs/public.type");

const creatCommentType ={
    type: responseType,
    args:{
        Comment: {type: GraphQLString},
        blogID: {type: GraphQLString},
        parent: {type: GraphQLString},     
    },
    resolve: async (_,args ,context)=>{
        const {Comment , blogID , parent} = args;
        console.log({Comment , blogID , parent});
        if(!mongoose.isValidObjectId(blogID)) throw createHttpError.BadRequest("blog id is not valid")
        await CheckExistBlog(blogID);
        const {req} = context;
        const user = await graphQLverifyAccessToken(req);
        let commentDocument;
        if(parent && mongoose.isValidObjectId(parent)){
            commentDocument = await CheckExistComment(BlogMoldle, parent);
            if(commentDocument &&!commentDocument.openToComment) throw createHttpError.BadRequest("you cant reply to this comment");
            const createComment  = await BlogMoldle.updateOne({
                "comments._id": parent
            } ,{
                $push:{
                    "comments.$.answers":{
                        comment: Comment,
                        user,
                        show: false,
                        openToComment: !mongoose.isValidObjectId(parent)
                    }
                }
            });
            if(!createComment.modifiedCount) throw createHttpError.InternalServerError("cant add comment");
                return{
                    statusCode: StatusCodes.CREATED,
                    data:{
                        message:"your reply submit successfully"
                    }
                }
            
        }else{
            if(commentDocument &&!commentDocument.openToComment) throw createHttpError.BadRequest("you cant reply to this comment");
            const newU = user._id;
            const created = await BlogMoldle.updateOne({_id: blogID} , {
                $push :{comments:{
                    comment: Comment,
                    user: newU,
                    show: false,
                    openToComment: !parent,
                }
                    
                }
            });
            if(!created) throw createHttpError.InternalServerError("cant cteated comment");

        }
        return {
            statusCode: StatusCodes.CREATED,
            data:{
                message: "comment added after accepted will be display "
            }
        }
    }
}
const creatCommentTypeForCourse ={
    type: responseType,
    args:{
        Comment: {type: GraphQLString},
        courseID: {type: GraphQLString},
        parent: {type: GraphQLString},     
    },
    resolve: async (_,args ,context)=>{
        const {Comment , courseID , parent} = args;
        console.log({Comment , courseID , parent});
        if(!mongoose.isValidObjectId(courseID)) throw createHttpError.BadRequest("course id is not valid")
        await CheckExistCourse(courseID);//*
        const {req} = context;
        const user = await graphQLverifyAccessToken(req);
        let commentDocument;
        if(parent && mongoose.isValidObjectId(parent)){
            commentDocument = await CheckExistComment(CoursesModel, parent);
            if(commentDocument &&!commentDocument.openToComment) throw createHttpError.BadRequest("you cant reply to this comment");
            const createComment  = await CoursesModel.updateOne({
                _id: courseID,
                "comments._id": parent
            } ,{
                $push:{
                    "comments.$.answers":{
                        comment: Comment,
                        user,
                        show: false,
                        openToComment: !mongoose.isValidObjectId(parent)
                    }
                }
            });
            console.log(createComment.modifiedCount);
            if(!createComment.modifiedCount) throw createHttpError.InternalServerError("cant add comment");
                return{
                    statusCode: StatusCodes.CREATED,
                    data:{
                        message:"your reply submit successfully"
                    }
                }
            
        }else{
            if(commentDocument &&!commentDocument.openToComment) throw createHttpError.BadRequest("you cant reply to this comment");
            const newU = user._id;
            const created = await CoursesModel.updateOne({_id: courseID} , {
                $push :{comments:{
                    comment: Comment,
                    user: newU,
                    show: false,
                    openToComment: !parent,
                }
                    
                }
            });
            if(!created) throw createHttpError.InternalServerError("cant cteated comment");

        }
        return {
            statusCode: StatusCodes.CREATED,
            data:{
                message: "comment added after accepted will be display "
            }
        }
    }
}
const creatCommentTypeForProduct ={
    type: responseType,
    args:{
        Comment: {type: GraphQLString},
        productID: {type: GraphQLString},
        parent: {type: GraphQLString},     
    },
    resolve: async (_,args ,context)=>{
        const {Comment , productID , parent} = args;
        console.log({Comment , productID , parent});
        if(!mongoose.isValidObjectId(productID)) throw createHttpError.BadRequest("product id is not valid")
        await CheckExistProduct(productID);//*
        const {req} = context;
        const user = await graphQLverifyAccessToken(req);
        let commentDocument;
        if(parent && mongoose.isValidObjectId(parent)){
            commentDocument = await CheckExistComment(ProductsMoldle, parent);
            if(commentDocument &&!commentDocument.openToComment) throw createHttpError.BadRequest("you cant reply to this comment");
            const createComment  = await ProductsMoldle.updateOne({
                _id: productID,
                "comments._id": parent
            } ,{
                $push:{
                    "comments.$.answers":{
                        comment: Comment,
                        user,
                        show: false,
                        openToComment: !mongoose.isValidObjectId(parent)
                    }
                }
            });
            if(!createComment.modifiedCount) throw createHttpError.InternalServerError("cant add comment");
                return{
                    statusCode: StatusCodes.CREATED,
                    data:{
                        message:"your reply submit successfully"
                    }
                }
            
        }else{
            if(commentDocument &&!commentDocument.openToComment) throw createHttpError.BadRequest("you cant reply to this comment");
            const newU = user._id;
            const created = await ProductsMoldle.updateOne({_id: productID} , {
                $push :{comments:{
                    comment: Comment,
                    user: newU,
                    show: false,
                    openToComment: !parent,
                }
                    
                }
            });
            if(!created) throw createHttpError.InternalServerError("cant cteated comment");

        }
        return {
            statusCode: StatusCodes.CREATED,
            data:{
                message: "comment added after accepted will be display "
            }
        }
    }
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
async function CheckExistComment(model ,id){
    const findedComment = await model.findOne({"comments._id" : id} , {"comments.$" : 1});
    const comment = findedComment;
    if(!comment?.comments?.[0]) throw createHttpError.NotFound("comment not founded not founded");
    return comment?.comments?.[0];
}

module.exports ={
    creatCommentType,
    creatCommentTypeForCourse,
    creatCommentTypeForProduct
}