const { blogAdminController } = require('./blog');
const { categoryRoutes } = require('./category');

const router = require('express').Router();
/**
 * @swagger
 *  tags:
 *       -  name: Admin-Panel
 *          description: action of admin (add , edite , remove , and any do)
 *       -  name: Category(AdminPanel)
 *          description: all methods and routs about category
 *       -  name: Blog(Admin-Panel)
 *          description: made blog management admin panel
 */
router.use("/category" , categoryRoutes);
router.use("/blogs" ,blogAdminController);

module.exports ={
    AdminRoutes: router
}