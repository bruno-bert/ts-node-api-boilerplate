import { adaptRoute } from '@/main/adapters'
import { makeAddChatController, makeLoadChatsController, makeLoadChatDetailController, makeUpdateChatController } from '@/main/factories'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/chats', auth, adaptRoute(makeAddChatController()))
  router.get('/chats', auth, adaptRoute(makeLoadChatsController()))
  router.get('/chats/:id', auth, adaptRoute(makeLoadChatDetailController()))
  router.put('/chats/:id', auth, adaptRoute(makeUpdateChatController()))
}
