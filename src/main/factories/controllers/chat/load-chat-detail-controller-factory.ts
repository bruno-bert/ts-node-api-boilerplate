import { makeLogControllerDecorator, makeDbLoadChatById, makeLoadChatDetailValidation } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoadChatDetailController } from '@/presentation/controllers'

export const makeLoadChatDetailController = (): Controller => {
  const controller = new LoadChatDetailController(makeDbLoadChatById(), makeLoadChatDetailValidation())
  return makeLogControllerDecorator(controller)
}
