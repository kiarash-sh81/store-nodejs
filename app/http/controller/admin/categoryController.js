const{ CategoryMoldle }= require('../../../models/categories');
const createError = require('http-errors');
const { addcategorySchema } = require('../../validator/admin/category.schema');
const controller = require('../controller');

class categoryController extends controller{
    async addCategory(req, res, next){
        try {
            await addcategorySchema.validateAsync(req.body);
            const {title , parent} = req.body;
            const category =await CategoryMoldle.create({title , parent});
            if(!category) throw createError.InternalServerError("internal server error");
            return res.status(201).json({
                data:{
                    statusCode:201,
                    success:true,
                    message:"category created successfully"
                }
            });           
        } catch (error) {
            next(error)
        }
    }
    async editeCategory(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async removeCategory(req, res, next){
        try {
            const {id} = req.params
            const category = await this.checkExistCategiryById(id);
            const deleted = await CategoryMoldle.deleteOne({_id: category._id});
            if(deleted.deletedCount==0) throw createError.InternalServerError("internal server error");
            return res.status(201).json({
                statusCode: 201,
                data:{
                    message: "category deleted successfully"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistCategiryById(id){
        const category = await CategoryMoldle.findById(id);
        if(!category) throw createError.NotFound("category not founded");
        return category;
    }
    async getAllCategory(req, res, next){
        try {
            const category = await CategoryMoldle.aggregate([
                {
                    $lookup:{
                        from:"categories",
                        localField:"_id",
                        foreignField:"parent",
                        as:"children"
                    }
                }
            ]);
            return res.status(200).json({
                statusCode:200,
                data:{
                    category
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getCategoryById(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async getAllHeads(req, res, next){
        try {
            const parents = await CategoryMoldle.find({parent: undefined});
            if(!parents) throw createError.InternalServerError("internal server error");
            return res.status(200).json({
                statusCode: 200,
                data:{
                    parents
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getChildParents(req, res, next){
        try {
            const {parent} = req.params;
            const childParents = await CategoryMoldle.find({parent});
            if(!childParents) throw createError.InternalServerError("internal server error");
            return res.status(200).json({
                statusCode: 200,
                data:{
                    childParents
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports={
    categoryController : new categoryController()
}