import { AddChat, LoadChats, CheckChatById } from '@/domain/usecases'
import { mockChatModels } from '@/tests/domain/mocks'

export class AddChatSpy implements AddChat {
  params: AddChat.Params

  async add (params: AddChat.Params): Promise<void> {
    this.params = params
  }
}

export class LoadChatsSpy implements LoadChats {
  accountId: string
  result = mockChatModels()

  async load (accountId: string): Promise<LoadChats.Result> {
    this.accountId = accountId
    return this.result
  }
}

export class CheckChatByIdSpy implements CheckChatById {
  id: string
  result = true

  async checkById (id: string): Promise<CheckChatById.Result> {
    this.id = id
    return this.result
  }
}
