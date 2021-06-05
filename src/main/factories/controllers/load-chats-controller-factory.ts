import { makeLogControllerDecorator, makeDbLoadChats } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoadChatsController } from '@/presentation/controllers'

export const makeLoadChatsController = (): Controller => {
  const controller = new LoadChatsController(makeDbLoadChats())
  return makeLogControllerDecorator(controller)
}
