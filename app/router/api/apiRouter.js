const  indexPage  = require('../../http/controller/api/indexPage');

const router = require('express').Router();

router.get("/" , indexPage.indexPage);

module.exports ={
    homeRoutes: router
}