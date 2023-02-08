const { checkPermission } = require('../../http/middlewares/Permission.Guard');
const { blogAdminController } = require('./blog');
const { categoryRoutes } = require('./category');
const { chapterRoutes } = require('./chapter');
const { courseRotes } = require('./course');
const { episodeRoutes } = require('./episod');
const { permissionRoutes } = require('./permission');
const { productRoutes } = require('./product');
const { roleRoutes } = require('./role');
const { userRouts } = require('./user');

const router = require('express').Router();

router.use("/category" , categoryRoutes);
router.use("/blogs" ,blogAdminController);
router.use("/products" , productRoutes);
router.use("/course" , courseRotes);
router.use("/chapter" , chapterRoutes);
router.use("/episode" , episodeRoutes);
router.use("/user" ,checkPermission(["USER"]), userRouts);
router.use("/role" , roleRoutes);
router.use("/permission" , permissionRoutes);

module.exports ={
    AdminRoutes: router
}