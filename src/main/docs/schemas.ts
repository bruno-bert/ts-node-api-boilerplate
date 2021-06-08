import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  chatsSchema,
  chatSchema,
  signUpParamsSchema,
  addChatParamsSchema,
  updateChatParamsSchema,
  saveChatParamsSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  addChatParams: addChatParamsSchema,
  updateChatParams: updateChatParamsSchema,
  error: errorSchema,
  chats: chatsSchema,
  chat: chatSchema,
  saveChatParams: saveChatParamsSchema
}
