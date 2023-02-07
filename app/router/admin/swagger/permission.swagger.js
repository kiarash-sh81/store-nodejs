/**
 * @swagger
 *  components:
 *      schemas:
 *          Permmission:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of permission
 *                  description:
 *                      type: string
 *                      description: the desc of permission
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdatePermission:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of permission
 *                  description:
 *                      type: string
 *                      description: the desc of permission                  
 */

/**
 * @swagger
 *  definitions:
 *      listOfPermission:
 *          type: object
 *          properties:
 *                  statusCode:
 *                      type: integer
 *                      example: 200
 *                  data:
 *                      type: object
 *                      properties:
 *                          permission:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      _id: 
 *                                          type: string
 *                                          example: "63da869ec06ce001ab13e683"
 *                                      title:
 *                                          type: string
 *                                          example: "this is the title"
 *                                      description:
 *                                          type: string
 *                                          example: "the desc of permission"
 *                                      
 */                 

/**
 * @swagger
 *  /admin/permission/list:
 *      get:
 *          tags: [RBAC(Admin-Panel)]
 *          summery: get all permission
 *          description: get all permission
 *          parameters:
 *          responses:
 *              200:
 *                  description: success
//  *                  content:
//  *                      application/json:
//  *                          schema:
//  *                              $ref: "#/definitions/listOfPermission"
 */

/**
 * @swagger
 *  /admin/permission/add:
 *      post:
 *          tags: [RBAC(Admin-Panel)]
 *          summery: create new permission
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref:  '#/components/schemas/Permmission'
 *          responses:
 *              201:
 *                  description: success
 *              500:
 *                  description: internal server error
 *          
 */

/**
 * @swagger
 *  /admin/permission/update/{id}:
 *      patch:
 *          tags: [RBAC(Admin-Panel)]
 *          summery: Update the permission
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of permission
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref:  '#/components/schemas/UpdatePermission'
 *          responses:
 *              201:
 *                  description: success
 *              500:
 *                  description: internal server error
 *          
 */

/**
 * @swagger
 *  /admin/permission/remove/{id}:
 *      delete:
 *          tags: [RBAC(Admin-Panel)]
 *          summery: remove permission
 *          description: remove permission
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  
 */