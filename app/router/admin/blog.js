const {blogController} = require('../../http/controller/admin/blog.controller');
const { uploadfile } = require('../../utils/multer.');
const {stringToArray} = require('../../http/middlewares/stringToArray');
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken');

const router = require('express').Router();
/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [Blog(Admin-Panel)]
 *          summery: get All Blogs
 *          parameters:
 *              -   in: header
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MDUwMTA3NDAxIiwiaWF0IjoxNjcyMzIyMzI2LCJleHAiOjE3MDM4NTgzMjZ9.ZEeG2aHdVCgsPqQ_RJA3gE3xFX1HcJC12xA9xb_KC8c
 *                  name: accesstoken
 *                  required: true
 *                  type: string
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
 *          consumes:
 *                -  multipart/form-data
 *                -  application/x-www-form-data-urlencoded
 *          parameters:
 *              -   in: header
 *                  example: bearer <token>
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MDUwMTA3NDAxIiwiaWF0IjoxNjcyMzIyMzI2LCJleHAiOjE3MDM4NTgzMjZ9.ZEeG2aHdVCgsPqQ_RJA3gE3xFX1HcJC12xA9xb_KC8c
 *                  name: accesstoken
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: title
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  expample: tag#tag1#tag2#tag_foo#foo_bar || str || undefined    
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  required: true
 *                  type: file
 *          responses:
 *              201:
 *                  description: success
 */
router.post("/add" ,verifyAccessToken, uploadfile.single("image"),stringToArray("tags"), blogController.createBlog)
module.exports ={
    blogAdminController : router
}