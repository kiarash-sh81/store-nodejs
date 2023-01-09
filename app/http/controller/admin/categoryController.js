const{ CategoryMoldle }= require('../../../models/categories');
const createError = require('http-errors');
const { addcategorySchema } = require('../../validator/admin/category.schema');
const controller = require('../controller');
const mongoose = require('mongoose');
const {StatusCodes} = require('http-status-codes');

class categoryController extends controller{
    async addCategory(req, res, next){
        try {
            await addcategorySchema.validateAsync(req.body);
            const {title , parent} = req.body;
            const category =await CategoryMoldle.create({title , parent});
            if(!category) throw createError.InternalServerError("internal server error");
            return res.status(StatusCodes.CREATED).json({
                data:{
                    statusCode:StatusCodes.CREATED,
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
            const {id} = req.params;
            const check =await this.checkExistCategiryById(id);
            const {title} = req.body;
            const resualt = await CategoryMoldle.updateOne({_id: id} , {$set:{title}});
            if(resualt.modifiedCount == 0) createError.InternalServerError("category not updated");
            return res.status(StatusCodes.OK).json({
                statusCode:StatusCodes.OK,
                data:{
                    message: "category updated successfully"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async removeCategory(req, res, next){
        try {
            const {id} = req.params
            const category = await this.checkExistCategiryById(id);
            const deleted = await CategoryMoldle.deleteMany({$or : [
                {_id:category._id},
                {parent:category._id}
            ]});
            if(deleted.deletedCount==0) throw createError.InternalServerError("internal server error");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
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
            // const category = await CategoryMoldle.aggregate([
            //     {
            //         $lookup:{
            //             from:"categories",
            //             localField:"_id",
            //             foreignField:"parent",
            //             as:"children"
            //         }
            //     }
            // ]);
            // const category = await CategoryMoldle.aggregate([
            //     {
            //         $graphLookup:{
            //             from:"categories",
            //             startWith: "$_id",
            //             connectFromField:"_id",
            //             connectToField:"parent",
            //             maxDepth:5,
            //             depthField: "depth",
            //             as:"children"
            //         }
            //     },
            //     {
            //         $project:{
            //             __v : 0,
            //             "children.__v" : 0,
            //             "children.parent" : 0
            //         }
            //     }
            // ]);
            const category = await CategoryMoldle.find({parent: undefined} , {__v: 0});
            return res.status(StatusCodes.OK).json({
                statusCode:StatusCodes.OK,
                data:{
                    category
                }
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    async getAllCategoryWithoutPopulate(req, res, next){
        try {
            const categories = await CategoryMoldle.aggregate([
                {$match: {}}
            ]);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getCategoryById(req, res, next){
        try {
            const {id : _id} = req.params;
            const category = await CategoryMoldle.aggregate ([
                {
                    $match:{_id : mongoose.Types.ObjectId(_id)},
                },
                {
                    $lookup:{
                        from:"categories",
                        localField:"_id",
                        foreignField:"parent",
                        as:"children"
                    }
                },
                {
                    $project:{
                        __v:0,
                        "children.__v":0,
                        "children.parent":0
                    }
                }
            ]);
            return res.status(StatusCodes.OK).json({
                statusCode:StatusCodes.OK,
                data:{
                    category
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllHeads(req, res, next){
        try {
            const parents = await CategoryMoldle.find({parent: undefined});
            if(!parents) throw createError.InternalServerError("internal server error");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
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
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
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