const { nameSpaceController } = require('../../http/controller/support/namespace.controller');

const router = require('express').Router();

router.post("/add" , nameSpaceController.addNameSpace);
router.get("/List" , nameSpaceController.getListOfNameSpace);

module.exports ={
    nameSpaceRoutes : router
}