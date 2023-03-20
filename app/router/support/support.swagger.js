/**
 * @swagger
 *  tags:
 *      -   name: Support
 *          description: 
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          NameSpace:
 *              type: object
 *              required:
 *                  -   title
 *                  -   endpoint
 *              properties:
 *                  title: 
 *                      type: string
 *                      description: nameSpace description
 *                  endpoint:
 *                      type: string
 *                      description: nameSpace Endpoint
 *          room:
 *              type: object
 *              required:
 *                  -   name
 *                  -   description
 *                  -   namespace
 *              properties:
 *                  name:
 *                      type: string
 *                      description: room name
 *                  description:
 *                      type: string
 *                      description: the description of room
 *                  namespace: 
 *                      type: string
 *                      description: room nameSpace
 *                  image:
 *                      type: file
 *                      description: the index picture of room
 */

/**
 * @swagger
 *  /support/namespace/add:
 *      post:
 *          tags: [Support]
 *          summery: adding namespace
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#components/schemas/NameSpace"
 *          responses:
 *              201:
 *                  description: success
 */
/**
 * @swagger
 *  /support/room/add:
 *      post:
 *          tags: [Support]
 *          summery: adding room
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#components/schemas/room"
 *          responses:
 *              201:
 *                  description: success
 */