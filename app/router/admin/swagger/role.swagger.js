/**
 * @swagger
 *  components:
 *      schemas:
 *          Role:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of role
 *                  permission:
 *                      type: array
 *                      description: the array of roles
 *                  description:
 *                      type: string
 *                      description: the description of roles
 *                  
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateRole:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of role
 *                  description:
 *                      type: string
 *                      description: the desc of role
 *                  permissions:
 *                      type:  array
 *                      description: the perms of roles
 *                  
 */

/**
 * @swagger
 *  definitions:
 *      listOfRole:
 *          type: object
 *          properties:
 *                  statusCode:
 *                      type: integer
 *                      example: 200
 *                  data:
 *                      type: object
 *                      properties:
 *                          role:
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
 *                                          example: "this is the description"
 *                                      permission:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  _id:
 *                                                      type: string
 *                                                      example: "63da869ec06ce001ab13e683"
 *                                                  title:
 *                                                      type: string
 *                                                      example: "title of permissions"
 *                                                  description:
 *                                                      type: string
 *                                                      example: "this is the desc"
 *                                      
 */                 

/**
 * @swagger
 *  /admin/role/list:
 *      get:
 *          tags: [RBAC(Admin-Panel)]
 *          summery: get all roles
 *          description: get all roles
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/listOfRole"
 */

/**
 * @swagger
 *  /admin/role/add:
 *      post:
 *          tags: [RBAC(Admin-Panel)]
 *          summery: create new role
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref:  '#/components/schemas/Role'
 *          responses:
 *              201:
 *                  description: success
 *              500:
 *                  description: internal server error
 *          
 */

/**
 * @swagger
 *  /admin/role/update/{id}:
 *      patch:
 *          tags: [RBAC(Admin-Panel)]
 *          summery: Update the role
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of role
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref:  '#/components/schemas/UpdateRole'
 *          responses:
 *              201:
 *                  description: success
 *              500:
 *                  description: internal server error
 *          
 */

/**
 * @swagger
 *  /admin/role/remove/{field}:
 *      delete:
 *          tags: [RBAC(Admin-Panel)]
 *          summery: remove role
 *          description: remove role
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  
 */