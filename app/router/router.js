const redisClient = require('../utils/redisInit');
const { AdminRoutes } = require('./admin/admin.routes');
const { homeRoutes } = require('./api/apiRouter');
const { userAuthentication } = require('./users/auth');

const router = require('express').Router();

router.use("/user" , userAuthentication);
router.use("/admin" , AdminRoutes);
router.use("/" ,homeRoutes);

module.exports = {
    AllRoutes: router
}