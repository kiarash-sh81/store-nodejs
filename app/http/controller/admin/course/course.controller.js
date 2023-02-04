const { CoursesModel } = require("../../../../models/course");
const controller = require("../../controller");
const {StatusCodes} = require('http-status-codes');
const path  =require('path');
const { createCourseSchema } = require("../../../validator/admin/course.schema");
const createHttpError = require("http-errors");
class courseController extends controller{
    async getAllCourse(req, res, next){
        try {
            const {search}  =req.query;
            let courses;
            if(search){
                courses = await CoursesModel.find({$text: {$search: search}}).populate([
                    {path: "category" , select: {title: 1}},{path: "teacher" , select: {mobile: 1}}
                ]).sort({_id: -1});
            }else{
                courses = await CoursesModel.find({}).populate([{path: "teacher" , select: {phone: 1}} , {path: "category" , select: {}}]).sort({_id: -1});
            }
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    success: true,
                    courses
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async addProduct(req, res, next){
        try {
            await createCourseSchema.validate(req.body);
            const {fileName , fileUploadPath} = req.body;
            const {title, text, short_text, tags , category , price , discount , type} = req.body;
            const images = path.join(fileUploadPath , fileName);
            if(Number(price) > 0 && type === "free") throw createHttpError.BadRequest("you cant set price for the free course")
            const teacher = req.user._id;
            const course = await CoursesModel.create({
                title, 
                text,
                short_text, 
                tags , 
                category , 
                price , 
                discount , 
                type , 
                images , 
                teacher , 
                time: "00:00:00",
                status: "notStarted"
            })
            if(!course?._id) throw createHttpError.InternalServerError("course  not created");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data:{
                    message: "course created successfully"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async getCourseById(req, res, next){
        try {
            const {id} = req.params;
            const course  = await CoursesModel.findById(id);
            if(!course) throw createHttpError.NotFound("course with this id not founded");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    course
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async findCourseById(id){
        const course = await CoursesModel.findById(id);
        if(!course) throw createHttpError.NotFound("the course does not exist");
        return course;
    }
}

module.exports ={
    courseController : new courseController()
}