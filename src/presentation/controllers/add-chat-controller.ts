import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, serverError, ok } from '@/presentation/helpers'
import { AddChat } from '@/domain/usecases'

export class AddChatController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addChat: AddChat
  ) {}

  async handle (request: AddChatController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const chat = {
        ...request,
        date: new Date()
      }

      await this.addChat.add(chat)
      return ok(chat)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddChatController {
  export type Request = {
    name: string
    welcomeMessage: string
    accountId: string
  }

}
