const { uploadfile } = require('../../utils/multer.');
const {stringToArray} = require('../../http/middlewares/stringToArray');
const {productController, ProductController} = require('../../http/controller/admin/product.controller');
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken');

const router = require('express').Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          Products:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of products
 *                  text:
 *                      type: string
 *                      description: the text of products
 *                  short_text:
 *                      type: string
 *                      description: the short text of products
 *                  tags:
 *                      type: array
 *                      description: the tags of products
 *                  category:
 *                      type: string
 *                      description: the category of products
 *                  price:
 *                      type: string
 *                      description: the price of products
 *                  discount:
 *                      type: string
 *                      description: the discount of products
 *                  count:
 *                      type: string
 *                      description: the count of products
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  width:
 *                      type: string
 *                      description: the count of products
 *                  length:
 *                      type: string
 *                      description: the count of products
 *                  height:
 *                      type: string
 *                      description: the count of products
 *                  weight:
 *                      type: string
 *                      description: the count of products
 */
/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags: [product(AdminPanel)]
 *          summery: create new products
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Products'
 *          responses:
 *              201:
 *                  description: success
 *          
 */
router.post("/add" ,uploadfile.array("images" , 10) ,stringToArray("tags") ,ProductController.addProduct);
/**
 * @swagger
 *  /admin/products/list:
 *      get:
 *          tags: [product(AdminPanel)]
 *          summery: get products
 *          responses:
 *              200:
 *                  description: success
 *          
 */
router.get("/list" ,ProductController.getAllProduct);

// router.patch();
// router.delete();
// router.get();
// router.get();

module.exports = {
    productRoutes : router
}