const {categoryController} = require('../../http/controller/admin/categoryController');

const router = require('express').Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(AdminPanel)]
 *          summery: create new category
 *          parameters:
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  name: parent
 *          responses:
 *              201:
 *                  description: success
 */             
router.post("/add" , categoryController.addCategory)
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summery: get the parents
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/parents" , categoryController.getAllHeads);
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summery: get childrens of parent
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/children/:parent" , categoryController.getChildParents);
/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summery: get all category
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/all", categoryController.getAllCategory);
/**
 * @swagger
 *  /admin/category/delete/{id}:
 *      delete:
 *          tags: [Category(AdminPanel)]
 *          summery: remove the category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              201:
 *                  description: success
 */
router.delete("/delete/:id" , categoryController.removeCategory);
/**
 * @swagger
 *  /admin/category/list-of:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summery: get list of category
 *          responses:
 *              200:
 *                  description: success
 *              500: 
 *                  description: internal server error
 */
router.get("/list-of" , categoryController.getAllCategoryWithoutPopulate);
/**
 * @swagger
 *  /admin/category/update{id}:
 *      patch:
 *          tags: [Category(AdminPanel)]
 *          summery: update category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: internal server error
 */
router.patch("/update:id" , categoryController.editeCategory);
/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summery: get category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:id" , categoryController.getCategoryById);

module.exports ={
    categoryRoutes: router
}