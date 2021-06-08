export const updateChatParamsSchema = {
  type: 'object',
  properties: {
    welcomeMessage: {
      type: 'string'
    },
    name: {
      type: 'string'
    }
  },
  required: ['welcomeMessage','name']
}
