const  indexPage  = require('../../http/controller/api/indexPage');
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken');

const router = require('express').Router();
/**
 * @swagger
 *  tags:
 *      name:IndexPage
 *      description:index page router
 */
/**
 * @swagger
 * /:
 *  get:
 *      summery: index of routes
 *      tags: [IndaxPage]
 *      description: get all need data for index page
 *      parameters:
 *          -   in: header
 *              name: accesstoken
 *              example: Beares YourToken...
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: not founded
 */

router.get("/" ,verifyAccessToken ,indexPage.indexPage);

module.exports ={
    homeRoutes: router
}