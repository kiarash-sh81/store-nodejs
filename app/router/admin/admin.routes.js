const { blogAdminController } = require('./blog');
const { categoryRoutes } = require('./category');
const { productRoutes } = require('./product');

const router = require('express').Router();
/**
 * @swagger
 *  tags:
 *       -  name: Admin-Panel
 *          description: action of admin (add , edite , remove , and any do)
 *       -  name: product(AdminPanel)
 *          description: action of admins for products(add , edite , remove , and any do)
 *       -  name: Category(AdminPanel)
 *          description: all methods and routs about category
 *       -  name: Blog(Admin-Panel)
 *          description: made blog management admin panel
 */
router.use("/category" , categoryRoutes);
router.use("/blogs" ,blogAdminController);
router.use("/products" , productRoutes);

module.exports ={
    AdminRoutes: router
}