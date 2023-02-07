const { userController } = require('../../http/controller/admin/users/user.controller');

const router = require('express').Router();

router.get("/all" , userController.getAllUser);
router.patch("/update-profile" , userController.updateUserProfile);

module.exports ={
    userRouts : router 
}