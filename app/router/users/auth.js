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
 *  /user/login:
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

router.post("/login" , Authentication.login);

module.exports ={
    userAuthentication: router
}