const { uploadfile } = require('../../utils/multer.');
const {stringToArray} = require('../../http/middlewares/stringToArray');
const {productController, ProductController} = require('../../http/controller/admin/product/product.controller');
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken');

const router = require('express').Router();

router.get("/list" ,ProductController.getAllProduct);

router.post("/add" ,verifyAccessToken, uploadfile.array("images" , 10) ,stringToArray("tags") ,ProductController.addProduct);


router.get("/:id" , ProductController.getOneProduct);

router.patch("/edit/:id" ,verifyAccessToken, uploadfile.array("images" , 10), stringToArray("tags"), ProductController.editeProduct);
// router.delete();
// router.get();

module.exports = {
    productRoutes : router
}