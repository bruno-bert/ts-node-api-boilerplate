export const chatByIdPath = {

  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Chat'],
    summary: 'API to get a chat',
    description: 'This route can only be executed by **authenticated users**',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'Chat ID to be returned',
      required: true,
      schema: {
        type: 'string'
      }
    }],

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
  },

  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Chat'],
    summary: 'API to update a chat',
    description: 'This route can only be executed by **authenticated users**',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'Chat ID to be updated',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/updateChatParams'
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
