const { createEpisodeSchema } = require('../../../validator/admin/course.schema');
const controller = require('../../controller');
const path = require('path');
const { getVideoDurationInSeconds } = require('get-video-duration');
const { getTime } = require('../../../../utils/function');
class episodController extends controller {
    async addEpisode(req, res, next){
        try {
            const {title , text , fileName , fileUploadPath , type , courseID , chapterID} = await createEpisodeSchema.validateAsync(req.body);
            const videoAdress = path.join(fileUploadPath , fileName);
            console.log(1);
            const videoUrl = `http://localhost:3000/${videoAdress}`;
            console.log(2);
            const seconds = await getVideoDurationInSeconds(videoUrl);
            console.log(3);
            const time = getTime(seconds);
            return res.json({
                title , text , fileName , fileUploadPath , type , courseID , chapterID, time
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    episodController : new episodController()
}