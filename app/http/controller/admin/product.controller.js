const path = require('path');
const { ProductsMoldle } = require('../../../models/products');
const { deleteFileInPublic, returnListOfImagesFromRequest } = require('../../../utils/function');
const { createProductSchema } = require('../../validator/admin/product.schema');
const controller = require('../controller');

class ProductController extends controller{
    async addProduct(req, res, next){
        try {
            
            console.log(req.files);
            const productDataBody =await createProductSchema.validateAsync(req.body);
            const images = returnListOfImagesFromRequest(req?.files || [],req.body.fileUploadPath);
            const {title , text , short_text , category , tags , price , count , discount , weight , height , length , width} = productDataBody;
            const suplier = req.user._id;
            let feature = {};
            let type;
            if(weight || height || length ||width){
                if(!weight) feature.weight = 0;
                else feature.weight = weight
                if(!height) feature.height = 0;
                else feature.height = height
                if(!length) feature.length = 0;
                else feature.length = length
                if(!width) feature.width = 0;
                else feature.width = width
                type = "physical"
            }else{
                type = "virtual"
            }
            
            const product = await ProductsMoldle.create({title, images ,text,short_text,category,tags ,price , count , discount , suplier , type , feature });
            return res.status(201).json({
                statusCode: 201,
                data:{
                    message: "product created successfully"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.image);
            next(error)
        }
    }
    async editeProduct(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async getAllProduct(req, res, next){
        try {
            const product = await ProductsMoldle.find({});
            return res.json({
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
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports ={
    ProductController : new ProductController()
}