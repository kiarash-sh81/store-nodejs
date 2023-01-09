const createHttpError = require('http-errors');
const path = require('path');
const { ProductsMoldle } = require('../../../models/products');
const { deleteFileInPublic, returnListOfImagesFromRequest } = require('../../../utils/function');
const { createProductSchema } = require('../../validator/admin/product.schema');
const { ObjectIdValidator } = require('../../validator/publicValidator');
const controller = require('../controller');
const {StatusCodes} = require('http-status-codes');

class ProductController extends controller{
    async addProduct(req, res, next){
        try {
            
            console.log(req.files);
            const productDataBody =await createProductSchema.validateAsync(req.body);
            const images = returnListOfImagesFromRequest(req?.files || [],req.body.fileUploadPath);
            const {title , text , short_text , category , tags , price , count , discount , weight , height , length , width , colors, type} = productDataBody;
            const suplier = req.user._id;
            let feature = {};
            feature.colors = colors
            if(!isNaN(+weight) || !isNaN(+height) || !isNaN(+length) || !isNaN(+width)){
                if(!weight) feature.weight = 0;
                else feature.weight = +weight
                if(!height) feature.height = 0;
                else feature.height = +height
                if(!length) feature.length = 0;
                else feature.length = +length
                if(!width) feature.width = 0;
                else feature.width = +width
            }
            
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
                product = await ProductsMoldle.find({})
            }
            //  product = await ProductsMoldle.find({});
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