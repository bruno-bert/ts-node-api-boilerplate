import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, notFound, ok, badRequest } from '@/presentation/helpers'
import { LoadChatById } from '@/domain/usecases'

export class LoadChatDetailController implements Controller {
  constructor (private readonly loadChatById: LoadChatById,
    private readonly validation: Validation) {}

  async handle (request: LoadChatDetailController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { accountId, chatId } = request
      const chat = await this.loadChatById.loadById(accountId, chatId)
      return chat ? ok(chat) : notFound()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadChatDetailController {
  export type Request = {
    accountId: string
    chatId: string
  }
}
