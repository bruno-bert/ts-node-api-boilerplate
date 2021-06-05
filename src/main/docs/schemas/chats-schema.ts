export const chatsSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/chat'
  }
}
