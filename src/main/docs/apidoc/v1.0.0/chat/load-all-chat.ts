/**
 * @api {get} /chats Request All Chats
 * @apiName GetChats
 * @apiVersion 1.0.0
 * @apiGroup Chat
 * @apiPermission authenticated user
 *
 *
 * @apiSuccess {String} name Name of the Chat.
 * @apiSuccess {String} welcomeMessage  Welcome Message of the Chat.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "John Chat",
 *       "welcomeMessage": "Hello There!"
 *     }
 *
 * @apiError NotFound API Route not found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 NotFound
 *     {
 *       "error": "Not Found"
 *     }
 */
