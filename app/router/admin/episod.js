const { episodController } = require('../../http/controller/admin/course/episod.controller');
const { uploadvideofile, uploadfile } = require('../../utils/multer.');

const router = require('express').Router();

router.post("/add" ,uploadvideofile.single("video") , episodController.addEpisode);
router.delete("/remove/:episodeID" , episodController.removeEpisode);

module.exports ={
    episodeRoutes : router
}