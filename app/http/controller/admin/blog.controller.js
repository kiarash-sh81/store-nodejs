const { createBlogSchema } = require('../../validator/admin/blog');
const controller = require('../controller');
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
    async getOneBlogById(req, res, next){
        try {
            
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