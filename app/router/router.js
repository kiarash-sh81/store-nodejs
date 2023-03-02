const { graphqlHTTP } = require('express-graphql');
const { verifyAccessToken, checkRole } = require('../http/middlewares/verifyAccessToken');
const redisClient = require('../utils/redisInit');
const { AdminRoutes } = require('./admin/admin.routes');
const { homeRoutes } = require('./api/apiRouter');
const { userAuthentication } = require('./users/auth');
const {graphQlSchema} = require('../graphql/index.resolver');
const { graphqlConfig } = require('../utils/graphql.config');

const router = require('express').Router();

router.use("/user" , userAuthentication);
router.use("/admin" ,verifyAccessToken , AdminRoutes);
router.use("/graphql" , graphqlHTTP(graphqlConfig))
router.use("/" ,homeRoutes);

module.exports = {
    AllRoutes: router
}