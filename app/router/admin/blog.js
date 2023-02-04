const {blogController} = require('../../http/controller/admin/blog/blog.controller');
const { uploadfile } = require('../../utils/multer.');
const {stringToArray} = require('../../http/middlewares/stringToArray');
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken');

const router = require('express').Router();

router.get("/" ,verifyAccessToken, blogController.getListOfBlog);

router.post("/add" ,verifyAccessToken, uploadfile.single("image"),stringToArray("tags"), blogController.createBlog);

router.patch("/update/:id" ,verifyAccessToken, uploadfile.single("image"),stringToArray("tags"), blogController.updateBlogById);

router.get("/:id" , verifyAccessToken , blogController.getOneBlogById)

router.delete("/:id" , verifyAccessToken , blogController.deleteBlogById);

module.exports ={
    blogAdminController : router
}