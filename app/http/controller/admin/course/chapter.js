const createHttpError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const { CoursesModel } = require('../../../../models/course');
const {deleteInvalidData} = require('../../../../utils/function');
const controller = require('../../controller');
class chapterController extends controller{
    async findCourseById(id){
        const course = await CoursesModel.findById(id);
        if(!course) throw createHttpError.NotFound("the course does not exist");
        return course;
    }
    async addChapter(req, res, next){
        try {
            const {id , title , text} = req.body;
            await this.findCourseById(id);
            const course = await CoursesModel.updateOne({_id: id} , {$push : {chapters: {title , text , episodes: []}}});
            if(course.modifiedCount == 0) throw createHttpError.InternalServerError("cant update course");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data:{
                    message: "course updated successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfChapter(req, res, next){
        try {
            const {id} = req.params;
            const chapters = await this.findChapter(id);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    chapters
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removeChapterById(req, res, next){
        try {
            const {chapterID} = req.params;
            const chapter = await this.findOneChapter(chapterID);
            const removeChap  = await CoursesModel.updateOne({"chapters._id" : chapterID} , {
                $pull:{
                    chapters:{
                        _id: chapterID
                    }
                }
            });
            if(removeChap.modifiedCount == 0) throw createHttpError.InternalServerError("cant remove chapter");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    message: "chapter deleted successfully"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async updateChapterBuId(req, res, next){
        try {
            const data = req.body;
            deleteInvalidData(data , ["_id"]);
            const {chapterID} = req.params;
            await this.findOneChapter(chapterID);
            const updating = await CoursesModel.updateOne({"chapters._id" : chapterID} , {
                $set :{
                    "chapters.$" : data
                }
            });
            if(updating.modifiedCount == 0) throw createHttpError.InternalServerError("cant update chapter");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    message: "chapter update successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findChapter(id){
        const chapter = await CoursesModel.findOne({_id: id} , {chapters : 1, title: 1});
        if(!chapter) throw createHttpError.NotFound("chapter not founded");
        return chapter
    }
    async findOneChapter(id){
        const chapter = await CoursesModel.findOne({"chapters._id" : id} , {"chapters.$" : 1});
        if(!chapter) throw createHttpError.NotFound("the chapter not founded");
        return chapter;
    }
}

module.exports = {
    chapterController : new chapterController()
}