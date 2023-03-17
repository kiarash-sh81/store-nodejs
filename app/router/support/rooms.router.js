const {roomsController  } = require('../../http/controller/support/rooms.controller');

const router = require('express').Router();

router.post("/add" , roomsController.addRooms);
router.get("/List" , roomsController.getListOfRooms);


module.exports ={
    roomsRoutes : router
}