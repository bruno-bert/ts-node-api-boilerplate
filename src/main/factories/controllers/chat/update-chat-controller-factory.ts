import { makeLogControllerDecorator, makeDbCheckChatById, makeDbUpdateChatById, makeUpdateChatValidation } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { UpdateChatController } from '@/presentation/controllers'

export const makeUpdateChatController = (): Controller => {
  const controller = new UpdateChatController(makeDbCheckChatById(), makeDbUpdateChatById(), makeUpdateChatValidation())
  return makeLogControllerDecorator(controller)
}
