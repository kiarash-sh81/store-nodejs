const { categoryRoutes } = require('./category');

const router = require('express').Router();
/**
 * @swagger
 *  tags:
 *      name: Admin-Panel
 *      description: action of admin (add , edite , remove , and any do)
 */
router.use("/category" , categoryRoutes);

module.exports ={
    AdminRoutes: router
}