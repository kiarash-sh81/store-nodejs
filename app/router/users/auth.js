const { Authentication } = require('../../http/controller/users/auth/authController');

const router = require('express').Router();

router.post("/get-otp" , Authentication.getOtp);

router.post("/check-otp" , Authentication.checkingOtp);

router.post("/refreshToken" , Authentication.refreshToken);

module.exports ={
    userAuthentication: router
}