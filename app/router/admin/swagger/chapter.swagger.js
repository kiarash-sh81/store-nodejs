/**
 * @swagger
 *  components:
 *      schemas:
 *          addChapter:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *              properties:
 *                  id:
 *                      type: string
 *                      example: 63da869ec06ce001ab13e683
 *                  title:
 *                      type: string
 *                      example: the title of chapter 1
 *                  text:
 *                      type: string
 *                      example: the text about chapter
 *          updateChap:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: the title of chapter 1
 *                  text:
 *                      type: string
 *                      example: the text about chapter
*/
/**
 * @swagger
 *  /admin/chapter/add:
 *      put:
 *          tags: [chapter(Admin-Panel)]
 *          summery: add new chapter
 *          description: new chapter
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/addChapter"
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/addChapter"
 *          responses:
 *              200:
 *                  description: success
 *                  
 */

/**
 * @swagger
 *  /admin/chapter/list/{id}:
 *      get:
 *          tags: [chapter(Admin-Panel)]
 *          summery:  get list of chapter
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

/**
 * @swagger
 *  /admin/chapter/remove/{chapterID}:
 *      patch:
 *          tags: [chapter(Admin-Panel)]
 *          summery:  get list of chapter
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  
 */

/**
 * @swagger
 *  /admin/chapter/update/{chapterID}:
 *      patch:
 *          tags: [chapter(Admin-Panel)]
 *          summery:  update chapter
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: "#/components/schemas/updateChap"
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/updateChap"
 *          responses:
 *              200:
 *                  description: success
 *                  
 */