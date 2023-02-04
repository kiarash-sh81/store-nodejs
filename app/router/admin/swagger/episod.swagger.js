/**
 * @swagger
 *  components:
 *      schemas:
 *          addEpisode:
 *              type: object
 *              required:
 *                  -   courseID
 *                  -   chapterID
 *                  -   title
 *                  -   text
 *                  -   video
 *                  -   type
 *              properties:
 *                  courseID:
 *                      type: string
 *                      example: 63da869ec06ce001ab13e683
 *                  chapterID:
 *                      type: string
 *                      example: 63dd3816a870b023e63aeb5a
 *                  title:
 *                      type: string
 *                      example: the title of episode 1
 *                  text:
 *                      type: string
 *                      example: the text about episode
 *                  type:
 *                      type: string
 *                      enum: 
 *                          -   lock
 *                          -   unlock
 *                  video:
 *                      type: string
 *                      description: the file of video
 *                      format: binary
*/

/**
 * @swagger
 *  /admin/episode/add:
 *      post:
 *          tags: [episod(Admin-Panel)]
 *          summery: add new episod
 *          description: new episod
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/addEpisode"
 *          responses:
 *              200:
 *                  description: success
 *                  
 */

/**
 * @swagger
 *  /admin/episode/remove/{episodeID}:
 *      delete:
 *          tags: [episod(Admin-Panel)]
 *          summery: remove episode
 *          description: remove episode
 *          parameters:
 *              -   in: path
 *                  name: episodeID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  
 */