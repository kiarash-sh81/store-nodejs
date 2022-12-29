const { createBlogSchema } = require('../../validator/admin/blog');
const controller = require('../controller');
const createError = require('http-errors');
const path = require('path');
const { BlogMoldle } = require('../../../models/blogs');
const { deleteFileInPublic } = require('../../../utils/function');
class blogController extends controller{
    async createBlog(req, res, next){
        try {
            const blogDataBody =await createBlogSchema.validateAsync(req.body);
            req.body.image = path.join(blogDataBody.fileUploadPath, blogDataBody.fileName);
            const image = req.body.image;
            const {title , text , short_text , category , tags} = blogDataBody;
            const author = req.user._id;
            const blog = await BlogMoldle.create({title,image ,text,short_text,category,tags , author});
            return res.json({
                statusCode:201,
                data:{
                    message: "blog created successfully"
                }
            });
        } catch (error) {
            deleteFileInPublic(req.body.image);
            next(error);
        }
    }
    async findBlog(id){
        const blog = await BlogMoldle.findOne({_id: id}).populate([{path:"category" , select:["_id" , "title"]} , {path:"author" , select: ["phone" , "_id"]}]);
        if(!blog) throw createError.NotFound("blog not founded");
        return blog;
    }
    async getOneBlogById(req, res, next){
        try {
            const {id} = req.params;
            const blog = await this.findBlog(id);
            return res.status(200).json({
                statusCode:200,
                data:{
                    blog
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfBlog(req, res, next){
        try {
            const blogs = await BlogMoldle.aggregate([
                {$match: {}},
                {
                    $lookup:{
                        from: "users",
                        foreignField: "_id",
                        localField: "author",
                        as: "author"
                }},
                {$unwind: "$author"},
                {$project:{
                    "author.Roles":0,
                    "author.bills":0,
                    "author.otp": 0,
                    "author.discount":0,
                    "author.__v":0
                }},
                {$lookup:{
                    from:"categories",
                    foreignField:"_id",
                    localField:"category",
                    as: "category"  
                }},
                {$unwind: "$category"},
                {$project:{
                    "category.__v":0,
                }}
                
            ]) 
            return res.status(200).json({
                statusCode: 200,
                data:{
                    blogs
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getCommentsOfBlog(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async deleteBlogById(req, res, next){
        try {
            const {id} = req.params;
            await this.findBlog(id);
            const deletingBlog = await BlogMoldle.deleteOne({_id: id});
            if(deletingBlog.deletedCount == 0) throw createError.InternalServerError("selecter blog didnot deleted please try again");
            return res.status(200).json({
                statusCode:200,
                data:{
                    message:"blog deleted successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateBlogById(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports ={
    blogController : new blogController()
}