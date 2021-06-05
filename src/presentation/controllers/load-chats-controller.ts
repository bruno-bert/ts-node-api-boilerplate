import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, serverError, ok } from '@/presentation/helpers'
import { LoadChats } from '@/domain/usecases'

export class LoadChatsController implements Controller {
  constructor (private readonly loadChats: LoadChats) {}

  async handle (request: LoadChatsController.Request): Promise<HttpResponse> {
    try {
      const Chats = await this.loadChats.load(request.accountId)
      return Chats.length ? ok(Chats) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadChatsController {
  export type Request = {
    accountId: string
  }
}
