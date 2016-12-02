// -----------------------------------------------------------------------------
// CREATE
// -----------------------------------------------------------------------------

/**
* @api {post} /post Create
* @apiName CreatePost
* @apiGroup Post
*
* @apiParam {String} title Post title.
* @apiParam {String} text Post body.
*
* @apiSuccess {MongoId} _id Post id.
* @apiSuccess {String} title Post title.
* @apiSuccess {String} text Post body.
* @apiSuccess {MongoId} author Post author.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "status_code": "200"
*       "message": "Success"
*       "data": {
*         "_id": "ObjectId("582b973374c74f4e5f896224")",
*         "title": "Post title",
*         "text": "Text example for documentation",
*         "author": "ObjectId("582b973374c74f4e5f896229")",
*       }
*     }
*
* @apiError BadRequestParams The given parameters contains errors.
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 400 BadRequest
*     {
*       "status_code": "400"
*       "message": "BadRequestParams - Parameters error"
*       "data": {
*         "username": "Required"
*       }
*     }
*/

// -----------------------------------------------------------------------------
// UPDATE
// -----------------------------------------------------------------------------

/**
* @api {get} /post/:id Read
* @apiName ReadPost
* @apiGroup Post
*
* @apiSuccess {MongoId} _id Post id.
* @apiSuccess {String} title Post title.
* @apiSuccess {String} text Post body.
* @apiSuccess {MongoId} author Post author.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "status_code": "200"
*       "message": "Success"
*       "data": {
*         "_id": "ObjectId("582b973374c74f4e5f896224")",
*         "title": "Post title",
*         "text": "Text example for documentation",
*         "author": "ObjectId("582b973374c74f4e5f896229")",
*       }
*     }
*
* @apiError BadRequestParams The given parameters contains errors.
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 400 BadRequest
*     {
*       "status_code": "400"
*       "message": "BadRequestParams - Parameters error"
*       "data": {
*         "username": "Required"
*       }
*     }
*/

// -----------------------------------------------------------------------------
// UPDATE
// -----------------------------------------------------------------------------

/**
* @api {put} /post/:id Update
* @apiName UpdatePost
* @apiGroup Post
*
* @apiParam {String} title Post title.
* @apiParam {String} text Post body.
*
* @apiSuccess {MongoId} _id Post id.
* @apiSuccess {String} title Post title.
* @apiSuccess {String} text Post body.
* @apiSuccess {MongoId} author Post author.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "status_code": "200"
*       "message": "Success"
*       "data": {
*         "_id": "ObjectId("582b973374c74f4e5f896224")",
*         "title": "Post title",
*         "text": "Text example for documentation",
*         "author": "ObjectId("582b973374c74f4e5f896229")",
*       }
*     }
*
* @apiError BadRequestParams The given parameters contains errors.
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 400 BadRequest
*     {
*       "status_code": "400"
*       "message": "BadRequestParams - Parameters error"
*       "data": {
*         "username": "Required"
*       }
*     }
*/

// -----------------------------------------------------------------------------
// DELETE
// -----------------------------------------------------------------------------

/**
* @api {delete} /post/:id Delete
* @apiName DeletePost
* @apiGroup Post
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "status_code": "200"
*       "message": "Success"
*       "data": {}
*     }
*
* @apiError BadRequestParams The given parameters contains errors.
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 400 BadRequest
*     {
*       "status_code": "400"
*       "message": "BadRequestParams - Parameters error"
*       "data": {
*         "id": "Required"
*       }
*     }
*/
