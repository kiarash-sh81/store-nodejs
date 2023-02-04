/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOtp:
 *              type: object
 *              required: 
 *                  -   phone
 *              properties:
 *                  phone:
 *                      type: string
 *                      description: the user phone for signin/signup
 *          CheckOtp:
 *              type: object
 *              required: 
 *                  -   phone
 *                  -   code
 *              properties:
 *                  phone:
 *                      type: string
 *                      description: the users phone for signup/signin
 *                  code:
 *                      type: integer
 *                      description: the resive code from getotp
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: enter refresh token for get fresh token and refresh token
 *              
 */
/**
 * @swagger
 *  tags:
 *      name: User-Authentication
 *      description: user-auth section
 */
/**
 * @swagger
 *  /user/get-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summery: login user in user panel with phone number
 *          description: one password (otp) login
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOtp'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOtp'
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summery: sending otp code and check the code
 *          description: otp code sending
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOtp'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOtp'
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 *  /user/refreshToken:
 *      post:
 *          tags: [User-Authentication]
 *          summery: sending token and get refresh token
 *          description: refresh token gen
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *          responses:
 *              200:
 *                  description: success
 */
