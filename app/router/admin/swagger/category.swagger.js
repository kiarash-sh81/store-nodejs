/**
 * @swagger
 *  components:
 *      schemas:
 *          AddCategory:
 *              type: object
 *              required: 
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  parent:
 *                      type: string
 *                      description: if the category has parent
 *              
 */
/**
/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(AdminPanel)]
 *          summery: create new category
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddCategory'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddCategory'
 *          responses:
 *              201:
 *                  description: success
 */             

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