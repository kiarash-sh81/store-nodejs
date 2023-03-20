const {roomsController  } = require('../../http/controller/support/rooms.controller');
const { uploadfile } = require('../../utils/multer.');

const router = require('express').Router();

router.post("/add" ,uploadfile.single("image"), roomsController.addRooms);
router.get("/List" , roomsController.getListOfRooms);


module.exports ={
    roomsRoutes : router
}