/**
 * @api {get} /chats/:id Request Specific Chat Details
 * @apiName GetChatDetails
 * @apiVersion 1.0.0
 * @apiGroup Chat
 * @apiPermission authenticated user
 * @apiParam {String} id Chat unique ID.
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
 * @apiError MissingParam:{paramName} The name of the missing parameter.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Bad Request
 *     {
 *       "error": "MissingParam:name"
 *     }
 *
 * @apiError InvalidParam:{paramName} The name of the invalid parameter.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Bad Request
 *     {
 *       "error": "InvalidParam:name"
 *     }
 *
 * @apiError NotFound
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 NotFound
 *     {
 *       "error": "Not Found"
 *     }
 */
