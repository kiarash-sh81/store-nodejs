const { courseController } = require('../../http/controller/admin/course/course.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { uploadfile } = require('../../utils/multer.');

const router = require('express').Router();

//* get all course

router.get("/list" , courseController.getAllCourse); 
//* create new course

router.post("/add", uploadfile.single("image") , stringToArray("tags") , courseController.addProduct);

router.get("/:id" , courseController.getCourseById);

router.patch("/update/:id" ,uploadfile.single("image"), courseController.updateCourse) //* edite a course
// router.post() //* create new episodes
// router.delete() //* delete a course

module.exports={
    courseRotes : router
}