const createHttpError = require('http-errors');
const path = require('path');
const { ProductsMoldle } = require('../../../../models/products');
const { deleteFileInPublic, returnListOfImagesFromRequest, copyObject, setFeatures, deleteInvalidData } = require('../../../../utils/function');
const { createProductSchema } = require('../../../validator/admin/product.schema');
const { ObjectIdValidator } = require('../../../validator/publicValidator');
const controller = require('../../controller');
const {StatusCodes} = require('http-status-codes');
const { object } = require('@hapi/joi');
const ProductBlackList = {
    BOOKMARKSl :"bookmarks",
    LIKES: "likes",
    DISLIKES: "dislikes",
    COMMENTS: "comments",
    SUPPLIER: "supplier",
    WEIGHT: "weight",
    WIDTH: "width",
    LENGTH: "length",
    HEIGHT: "height",
    COLORS: "colors"
}
Object.freeze(ProductBlackList);

class ProductController extends controller{
    async addProduct(req, res, next){
        try {
            
            console.log(req.files);
            const productDataBody =await createProductSchema.validateAsync(req.body);
            const images = returnListOfImagesFromRequest(req?.files || [],req.body.fileUploadPath);
            const {title , text , short_text , category , tags , price , count , discount , weight , height , length , width , colors, type} = productDataBody;
            const suplier = req.user._id;
            let feature = setFeatures(req.body);
            const product = await ProductsMoldle.create({title, images ,text,short_text,category,tags ,price , count , discount , suplier , type , feature });
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data:{
                    message: "product created successfully"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.image);
            next(error)
        }
    }
    async findProductById(productId){
        const {id} = await ObjectIdValidator.validateAsync({id: productId});
        const product = await ProductsMoldle.findById(id);
        if(!product) throw createHttpError.NotFound("product not founded");
        return product;
    }
    async editeProduct(req, res, next){
        try {
            const {id} = req.params;
            const product = await this.findProductById(id);
            const data = copyObject(req.body);
            data.images = returnListOfImagesFromRequest(req?.files || [] , req.body.fileUploadPath);
            data.feature = setFeatures(req.body);
            let blackList = Object.values(ProductBlackList);
            deleteInvalidData(data , blackList);
            const updateProductResualt = await ProductsMoldle.updateOne({_id : product._id} , {$set: data});
            if(updateProductResualt.modifiedCount == 0) throw {statusCode: StatusCodes.INTERNAL_SERVER_ERROR , success: false , message: "internal server error"} 
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    success:true,
                    message: "update product successfully"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async getAllProduct(req, res, next){
        try {
            
            let product;
            const search = req?.query?.search || "";
            if(search){
               product = await ProductsMoldle.find({
                    $text : {
                        $search : new RegExp(search , "ig") 
                    }
                });
            }else{
                product = await ProductsMoldle.find({}).populate([{path: "category"}, {path: "suplier"}])
            }
            return res.status(StatusCodes.OK).json({
                product
            })
        } catch (error) {
            next(error)
        }
    }
    async removeProduct(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async getOneProduct(req, res, next){
        try {
            const {id} = req.params;
            const product = await this.findProductById(id);
            if(!product) throw createHttpError.InternalServerError("internal server error");
            return res.status(StatusCodes.OK).json({
                statusCode:StatusCodes.OK,
                data:{
                    product
                }
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports ={
    ProductController : new ProductController()
}