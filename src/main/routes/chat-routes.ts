import { adaptRoute } from '@/main/adapters'
import { makeAddChatController, makeLoadChatsController } from '@/main/factories'
import { adminAuth, auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/chats', adminAuth, adaptRoute(makeAddChatController()))
  router.get('/chats', auth, adaptRoute(makeLoadChatsController()))
}
