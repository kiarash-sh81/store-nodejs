const  indexPage  = require('../../http/controller/api/indexPage');

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
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: not founded
 */

router.get("/" , indexPage.indexPage);

module.exports ={
    homeRoutes: router
}