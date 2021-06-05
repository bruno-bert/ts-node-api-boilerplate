export const addChatParamsSchema = {
  type: 'object',
  properties: {
    welcomeMessage: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    accountId: {
      type: 'string'
    }
  },
  required: ['welcomeMessage', 'accountId', 'name']
}
