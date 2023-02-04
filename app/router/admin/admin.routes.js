const { blogAdminController } = require('./blog');
const { categoryRoutes } = require('./category');
const { chapterRoutes } = require('./chapter');
const { courseRotes } = require('./course');
const { productRoutes } = require('./product');

const router = require('express').Router();

router.use("/category" , categoryRoutes);
router.use("/blogs" ,blogAdminController);
router.use("/products" , productRoutes);
router.use("/course" , courseRotes);
router.use("/chapter" , chapterRoutes);

module.exports ={
    AdminRoutes: router
}