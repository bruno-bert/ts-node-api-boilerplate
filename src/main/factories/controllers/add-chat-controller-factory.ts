import { makeAddChatValidation, makeLogControllerDecorator, makeDbAddChat } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { AddChatController } from '@/presentation/controllers'

export const makeAddChatController = (): Controller => {
  const controller = new AddChatController(makeAddChatValidation(), makeDbAddChat())
  return makeLogControllerDecorator(controller)
}
