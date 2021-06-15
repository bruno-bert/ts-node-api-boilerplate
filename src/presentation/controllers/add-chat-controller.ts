import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, serverError, ok } from '@/presentation/helpers'
import { AddChat } from '@/domain/usecases'
import { Step } from '@/domain/models'

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

      const { welcomeMessage, name, accountId } = request
      const chat = {
        ...request,
        date: new Date()
      }
      const result = await this.addChat.add(chat)

      return ok(result)
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
    steps?: Step[]
  }

}
