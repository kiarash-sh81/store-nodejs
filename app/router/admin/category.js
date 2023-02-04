const {categoryController} = require('../../http/controller/admin/category/categoryController');

const router = require('express').Router();

router.post("/add" , categoryController.addCategory)

router.get("/parents" , categoryController.getAllHeads);

router.get("/children/:parent" , categoryController.getChildParents);

router.get("/all", categoryController.getAllCategory);

router.delete("/delete/:id" , categoryController.removeCategory);

router.get("/list-of" , categoryController.getAllCategoryWithoutPopulate);

router.patch("/update:id" , categoryController.editeCategory);

router.get("/:id" , categoryController.getCategoryById);

module.exports ={
    categoryRoutes: router
}