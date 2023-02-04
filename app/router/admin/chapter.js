const { chapterController } = require('../../http/controller/admin/course/chapter');

const router = require('express').Router();
router.put("/add" , chapterController.addChapter) //* create new chapter
router.get("/list/:id" , chapterController.getListOfChapter);//* get the list of chapters
router.patch("/remove/:chapterID" , chapterController.removeChapterById); //* remove chapter
router.patch("/update/:chapterID" , chapterController.updateChapterBuId); //* update chapter
module.exports = {
    chapterRoutes : router
}