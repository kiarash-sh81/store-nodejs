const { supportController } = require('../../http/controller/support/support.controller');
const { checkLogin, checkAccessLogin } = require('../../http/middlewares/auth');
const { nameSpaceRoutes } = require('./namespace.router');
const { roomsRoutes } = require('./rooms.router');

const router = require('express').Router();

router.use("/namespace" , nameSpaceRoutes);
router.use("/room" , roomsRoutes)
router.get("/" , checkLogin,supportController.renderChat);
router.get("/login" ,checkAccessLogin , supportController.loginForm);
router.post("/login" ,checkAccessLogin, supportController.login);

module.exports ={
    supportRoutes : router
}