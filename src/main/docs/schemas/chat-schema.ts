export const chatSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    welcomeMessage: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    accountId: {
      type: 'string'
    },
    date: {
      type: 'string'
    }
  },
  required: ['id', 'welcomeMessage', 'name', 'date', 'accountId']
}
