const { Authentication } = require('../../http/controller/users/auth/authController');

const router = require('express').Router();
/**
 * @swagger
 *  tags:
 *      name: User-Authentication
 *      description: user-auth section
 */
/**
 * @swagger
 *  /user/get-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summery: login user in user panel with phone number
 *          description: one password (otp) login
 *          parameters:
 *          -   name: phone
 *              description: fa-IRI phone number
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal server error
 */

router.post("/get-otp" , Authentication.getOtp);
/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summery: sending otp code and check the code
 *          description: otp code sending
 *          parameters:
 *          -   name: phone
 *              description: fa-IRI phone number
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: otp code
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal server error
 */
router.post("/check-otp" , Authentication.checkingOtp);
/**
 * @swagger
 *  /user/refreshToken:
 *      post:
 *          tags: [User-Authentication]
 *          summery: sending token and get refresh token
 *          description: refresh token gen
 *          parameters:
 *          -   name: refreshToken
 *              description: refresh token
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: success
 */
router.post("/refreshToken" , Authentication.refreshToken);

module.exports ={
    userAuthentication: router
}