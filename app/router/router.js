const { homeRoutes } = require('./api/apiRouter');

const router = require('express').Router();

router.use("/" ,homeRoutes);

module.exports = {
    AllRoutes: router
}