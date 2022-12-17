const {categoryController} = require('../../http/controller/admin/categoryController');

const router = require('express').Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Admin-Panel]
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
 *          tags: [Admin-Panel]
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
 *          tags: [Admin-Panel]
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
 *          tags: [Admin-Panel]
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
 *          tags: [Admin-Panel]
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
router.delete("/delete/:id" , categoryController.removeCategory)

module.exports ={
    categoryRoutes: router
}