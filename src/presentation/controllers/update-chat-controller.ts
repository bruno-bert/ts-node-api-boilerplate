import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, notFound, ok, badRequest } from '@/presentation/helpers'
import { CheckChatById, UpdateChatById } from '@/domain/usecases'

export class UpdateChatController implements Controller {
  constructor (private readonly checkChatById: CheckChatById,
    private readonly updateChatById: UpdateChatById,
    private readonly validation: Validation) {}

  async handle (request: UpdateChatController.Request): Promise<HttpResponse> {
    try {
      const { accountId, id } = request
      const error = this.validation.validate(request)

      if (error) {
        return badRequest(error)
      }

      const chat = await this.checkChatById.checkById(accountId, id)
      if (!chat) { return notFound() }

      const { welcomeMessage, name } = request
      const data = {
        name,
        welcomeMessage,
        date: new Date()
      }

      const chatUpdated = await this.updateChatById.updateById(accountId, id, data)
      if (!chatUpdated) { return notFound() }

      return ok(chatUpdated)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateChatController {
  export type Request = {
    accountId: string
    id: string
    welcomeMessage: string
    name: string
  }
}
