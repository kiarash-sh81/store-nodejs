/**
 * @swagger
 *  components:
 *      schemas:
 *          Types:
 *              type: string
 *              enum:
 *                  -   free
 *                  -   cash
 *                  -   special
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   type
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of course
 *                  text:
 *                      type: string
 *                      description: the text of course
 *                  short_text:
 *                      type: string
 *                      description: the short text of course
 *                  tags:
 *                      type: array
 *                      description: the tags of course
 *                  category:
 *                      type: string
 *                      description: the category of course
 *                  price:
 *                      type: string
 *                      description: the price of course
 *                  discount:
 *                      type: string
 *                      description: the discount of course
 *                  images:
 *                      type: string
 *                      format: binary
 *                  type:
 *                      $ref: '#/components/schemas/Types'
 */                  

/**
 * @swagger
 *  definitions:
 *      listOfCourses:
 *          type: object
 *          properties:
 *                  statusCode:
 *                      type: integer
 *                      example: 200
 *                  data:
 *                      type: object
 *                      properties:
 *                          course:
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
 *                                      short_text:
 *                                          type: string
 *                                          example: "this is the short text"
 *                                      text:
 *                                          type: string
 *                                          example: "this is the text"
 *                                      status:
 *                                          type: string
 *                                          example: "holding | notStarted | completed"
 *                                      time:
 *                                          type: string
 *                                          example: "1:22:35"
 *                                      price:
 *                                          type: integer
 *                                          example: 240000
 *                                      discount:
 *                                          type: integer
 *                                          example: 20
 *                                      studentCount:
 *                                          type: integer
 *                                          example: 50
 *                                      teacher:
 *                                          type: string
 *                                          example: "kiarash shahroudi"
 */                 

/**
 * @swagger
 *  /admin/course/list:
 *      get:
 *          tags: [course(Admin-Panel)]
 *          summery: get all course
 *          description: get all course
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in query
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/listOfCourses"
 */

/**
 * @swagger
 *  /admin/course/add:
 *      post:
 *          tags: [course(Admin-Panel)]
 *          summery: create new course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          required:
 *                              -   title
 *                              -   text
 *                              -   short_text
 *                              -   tags
 *                              -   category
 *                              -   price
 *                              -   discount
 *                              -   type
 *                              -   image
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  description: the title of course
 *                              text:
 *                                  type: string
 *                                  description: the text of course
 *                              short_text:
 *                                  type: string
 *                                  description: the short text of course
 *                              tags:
 *                                  type: array
 *                                  description: the tags of course
 *                              category:
 *                                  type: string
 *                                  description: the category of course
 *                              price:
 *                                  type: string
 *                                  description: the price of course
 *                              discount:
 *                                  type: string
 *                                  description: the discount of course
 *                              images:
 *                                  type: string
 *                                  format: binary
 *                              type:
 *                                  $ref: '#/components/schemas/Types'
 *          responses:
 *              201:
 *                  description: success
 *              500:
 *                  description: internal server error
 *          
 */

/**
 * @swagger
 *  /admin/course/update/{id}:
 *      patch:
 *          tags: [course(Admin-Panel)]
 *          summery: create new course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  description: the title of course
 *                              text:
 *                                  type: string
 *                                  description: the text of course
 *                              short_text:
 *                                  type: string
 *                                  description: the short text of course
 *                              tags:
 *                                  type: array
 *                                  description: the tags of course
 *                              category:
 *                                  type: string
 *                                  description: the category of course
 *                              price:
 *                                  type: string
 *                                  description: the price of course
 *                              discount:
 *                                  type: string
 *                                  description: the discount of course
 *                              images:
 *                                  type: string
 *                                  format: binary
 *                              type:
 *                                  $ref: '#/components/schemas/Types'
 *          responses:
 *              201:
 *                  description: success
 *              500:
 *                  description: internal server error
 *          
 */

/**
 * @swagger
 *  /admin/course/{id}:
 *      get:
 *          tags: [course(Admin-Panel)]
 *          summery: get one course
 *          description: get one of courses
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: course id
 *          responses:
 *              200:
 *                  description: success
 */


