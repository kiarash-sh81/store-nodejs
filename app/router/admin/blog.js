const {blogController} = require('../../http/controller/admin/blog.controller');
const { uploadfile } = require('../../utils/multer.');
const {stringToArray} = require('../../http/middlewares/stringToArray');
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken');

const router = require('express').Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  short_text:
 *                      type: string
 *                      description: the short text of text of blog
 *                  tags:
 *                      type: string
 *                      description: the tags of blog
 *                  category:
 *                      type: string
 *                      description: the category of blog
 *                  image:
 *                      type: file
 *                      description: the image of blog
 * 
*/
/**
/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [Blog(Admin-Panel)]
 *          summery: get All Blogs
 *          responses:
 *              200:
 *                  description: get array of blogs
 */
router.get("/" ,verifyAccessToken, blogController.getListOfBlog);
/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags: [Blog(Admin-Panel)]
 *          summery: create blog document
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *          responses:
 *              201:
 *                  description: success
 */
router.post("/add" ,verifyAccessToken, uploadfile.single("image"),stringToArray("tags"), blogController.createBlog);
/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags: [Blog(Admin-Panel)]
 *          summery: update blog document
 *          consumes:
 *                -  multipart/form-data
 *                -  application/x-www-form-data-urlencoded
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *              -   in: header
 *                  example: bearer <token>
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MDUwMTA3NDAxIiwiaWF0IjoxNjcyMzIyMzI2LCJleHAiOjE3MDM4NTgzMjZ9.ZEeG2aHdVCgsPqQ_RJA3gE3xFX1HcJC12xA9xb_KC8c
 *                  name: accesstoken
 *                  type: string
 *              -   in: formData
 *                  name: title
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  expample: tag#tag1#tag2#tag_foo#foo_bar || str || undefined    
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  type: file
 *          responses:
 *              200:
 *                  description: success
 */
router.patch("/update/:id" ,verifyAccessToken, uploadfile.single("image"),stringToArray("tags"), blogController.updateBlogById);
/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          tags: [Blog(Admin-Panel)]
 *          summary: get blog by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *              -   in: header
 *                  name: accesstoken
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MDUwMTA3NDAxIiwiaWF0IjoxNjcyMzIyMzI2LCJleHAiOjE3MDM4NTgzMjZ9.ZEeG2aHdVCgsPqQ_RJA3gE3xFX1HcJC12xA9xb_KC8c
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:id" , verifyAccessToken , blogController.getOneBlogById)
/**
 * @swagger
 *  /admin/blogs/{id}:
 *      delete:
 *          tags: [Blog(Admin-Panel)]
 *          summary: delete blog by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *              -   in: header
 *                  name: accesstoken
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MDUwMTA3NDAxIiwiaWF0IjoxNjcyMzIyMzI2LCJleHAiOjE3MDM4NTgzMjZ9.ZEeG2aHdVCgsPqQ_RJA3gE3xFX1HcJC12xA9xb_KC8c
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */
router.delete("/:id" , verifyAccessToken , blogController.deleteBlogById);

module.exports ={
    blogAdminController : router
}