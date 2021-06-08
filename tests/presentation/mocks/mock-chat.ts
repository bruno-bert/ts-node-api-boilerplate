import { AddChat, LoadChats, CheckChatById, LoadChatById, UpdateChatById, UpdateChatModel } from '@/domain/usecases'
import { mockChatModel, mockChatModels } from '@/tests/domain/mocks'

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
  accountId: string
  result = true

  async checkById (accountId: string, id: string): Promise<CheckChatById.Result> {
    this.id = id
    this.accountId = accountId
    return this.result
  }
}

export class UpdateChatByIdSpy implements UpdateChatById {
  id: string
  accountId: string
  updateChatModel: UpdateChatModel
  result = mockChatModel()

  async updateById (accountId: string, id: string, updateChatModel: UpdateChatModel): Promise<UpdateChatById.Result> {
    this.id = id
    this.accountId = accountId
    this.updateChatModel = updateChatModel
    return this.result
  }
}

export class LoadChatByIdSpy implements LoadChatById {
  id: string
  accountId: string
  result = mockChatModel()

  async loadById (accountId: string, id: string): Promise<LoadChatById.Result> {
    this.accountId = accountId
    this.id = id
    return this.result
  }
}
