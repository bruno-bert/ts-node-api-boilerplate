import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers'
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
      await this.addChat.add({
        ...request,
        date: new Date()
      })
      return noContent()
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
