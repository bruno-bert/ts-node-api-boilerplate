import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  chatsSchema,
  chatSchema,
  signUpParamsSchema,
  addChatParamsSchema,
  saveChatParamsSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  addChatParams: addChatParamsSchema,
  error: errorSchema,
  chats: chatsSchema,
  chat: chatSchema,
  saveChatParams: saveChatParamsSchema
}
