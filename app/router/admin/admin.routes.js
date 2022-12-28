const { categoryRoutes } = require('./category');

const router = require('express').Router();
/**
 * @swagger
 *  tags:
 *       -  name: Admin-Panel
 *          description: action of admin (add , edite , remove , and any do)
 *       -  name: Category(AdminPanel)
 *          description: all methods and routs about category
 */
router.use("/category" , categoryRoutes);

module.exports ={
    AdminRoutes: router
}