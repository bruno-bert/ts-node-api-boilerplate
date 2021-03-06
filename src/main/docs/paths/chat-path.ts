export const chatPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Chat'],
    summary: 'API to list all chats',
    description: 'This route can only be executed by **authenticated users**',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/chats'
            }
          }
        }
      },
      204: {
        description: 'Success, but not content to show'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Chat'],
    summary: 'API to create a new chat',
    description: 'This route can only be executed by **authenticated users**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addChatParams'
          }
        }
      }
    },
    responses: {
      400: {
        $ref: '#/components/badRequest'
      },
      200: {
        $ref: '#/components/ok'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }

}
