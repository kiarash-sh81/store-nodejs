const { createEpisodeSchema } = require('../../../validator/admin/course.schema');
const controller = require('../../controller');
const path = require('path');
const { getVideoDurationInSeconds } = require('get-video-duration');
const { getTime, deleteInvalidData, copyObject } = require('../../../../utils/function');
const { CoursesModel } = require('../../../../models/course');
const createHttpError = require('http-errors');
const {isValidObjectId} = require('mongoose');
const { StatusCodes } = require('http-status-codes');
class episodController extends controller {
    async addEpisode(req, res, next){
        try {
            const {title , text , fileName , fileUploadPath , type , courseID , chapterID} = await createEpisodeSchema.validateAsync(req.body);
            const videoAddress = path.join(fileUploadPath , fileName);
            const videoUrl = `http://localhost:3000/${videoAddress}`;
            const seconds = await getVideoDurationInSeconds(videoUrl);
            const time = getTime(seconds);
            const episode = {title , text , type , videoAddress , time}
            const createEpisode = await CoursesModel.updateOne({_id : courseID , "chapters._id" : chapterID} , {
                $push :{
                    "chapters.$.episodes" : episode
                }
            });
            if(createEpisode.modifiedCount == 0) throw createHttpError.InternalServerError("cant create episode");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data:{
                    message: "episode added successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removeEpisode(req, res, next){
        try {
            const {episodeID} = req.params
            // const episodeID = await isValidObjectId();
            const removeEpisodeResualt = await CoursesModel.updateOne({
                "chapters.episodes._id" : episodeID
            } , {
                $pull:{
                    "chapters.$.episodes" : {
                        _id : episodeID
                    }
                }
            });
            if(removeEpisodeResualt.modifiedCount == 0) throw createHttpError.InternalServerError("cant remove episode");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    message: "episode deleted successfully"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async updateEpisode(req, res, next){
        try {
            const{episodeID} = req.params;
            const episode = await this.getOneEpisode(episodeID);
            console.log(episode);
            const {fileName , fileUploadPath} = req.body;
            let blackList = ["_id"];
            if(fileName && fileUploadPath){
                 req.body.videoAddress = path.join(fileUploadPath , fileName);
                const videoUrl = `http://localhost:3000/${req.body.videoAddress}`;
                const seconds = await getVideoDurationInSeconds(videoUrl);
                req.body.time = getTime(seconds);
                blackList.push("fileName");
                blackList.push("fileUploadPath")
            } else{
                blackList.push("time");
                blackList.push("videAddress");
            }
            const data = {...req.body}
            deleteInvalidData(data , blackList);
            const newEpisode = {...episode , ...data}
            const editeEpisodeResualt = await CoursesModel.updateOne({"chapters.episodes._id" : episodeID} , {
                $set :{
                    "chapters.$.episodes" : newEpisode
                }
            });
            if(!editeEpisodeResualt.modifiedCount) throw createHttpError.InternalServerError("cant update episode");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    message: "episode updated successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getOneEpisode(episodeID){
        const course = await CoursesModel.findOne({"chapters.episodes._id": episodeID}, {
            "chapters.$.episodes": 1
        })
        console.log(course);
        if(!course) throw createHttpError.NotFound("episode not founded");
        const episode = await course?.chapters?.[0]?.episodes?.[0];
        return copyObject(episode)
    }
}

module.exports = {
    episodController : new episodController()
}