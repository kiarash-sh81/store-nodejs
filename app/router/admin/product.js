const { uploadfile } = require('../../utils/multer.');
const {stringToArray} = require('../../http/middlewares/stringToArray');
const {productController, ProductController} = require('../../http/controller/admin/product.controller');
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken');

const router = require('express').Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
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
 *                  type:
 *                      type: string
 *                      enum: [virtual , phisical]
 *                      description: type of your product
 *                  colors:
 *                      type: string
 *                      enum:
 *                          -   black
 *                          -   white
 *                          -   red
 *                          -   green
 *                          -   blue
 */
/**
/**
 * @swagger
 *  /admin/products/list:
 *      get:
 *          tags: [product(AdminPanel)]
 *          summery: get products
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text of search in text, title, short_text
 *          responses:
 *              200:
 *                  description: success
 *          
 */
router.get("/list" ,ProductController.getAllProduct);
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
 *                          $ref:  '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: success
 *              500:
 *                  description: internal server error
 *          
 */
router.post("/add" ,verifyAccessToken, uploadfile.array("images" , 10) ,stringToArray("tags") ,ProductController.addProduct);
/**
 * @swagger
 *  /admin/products/{id}:
 *      get:
 *          tags: [product(AdminPanel)]
 *          summery: find product by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  description: the id of product
 *          responses:
 *              200:
 *                  description: success
 */

router.get("/:id" , ProductController.getOneProduct);
// router.patch();
// router.delete();
// router.get();

module.exports = {
    productRoutes : router
}