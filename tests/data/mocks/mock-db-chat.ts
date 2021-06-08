import { AddChatRepository, LoadChatByIdRepository, LoadChatsRepository, CheckChatByIdRepository, UpdateChatByIdRepository } from '@/data/protocols'
import { UpdateChatModel } from '@/domain/usecases'
import { mockChatModel, mockChatModels } from '@/tests/domain/mocks'

export class AddChatRepositorySpy implements AddChatRepository {
  params: AddChatRepository.Params

  async add (params: AddChatRepository.Params): Promise<void> {
    this.params = params
  }
}

export class LoadChatByIdRepositorySpy implements LoadChatByIdRepository {
  accountId: string
  id: string
  result = mockChatModel()

  async loadById (accountId: string, id: string): Promise<LoadChatByIdRepository.Result> {
    this.accountId = accountId
    this.id = id
    return this.result
  }
}

export class CheckChatByIdRepositorySpy implements CheckChatByIdRepository {
  accountId: string
  id: string
  result = true

  async checkById (accountId: string, id: string): Promise<CheckChatByIdRepository.Result> {
    this.accountId = accountId
    this.id = id
    return this.result
  }
}

export class LoadChatsRepositorySpy implements LoadChatsRepository {
  accountId: string
  result = mockChatModels()

  async loadAll (accountId: string): Promise<LoadChatsRepository.Result> {
    this.accountId = accountId
    return this.result
  }
}

export class UpdateChatByIdRepositorySpy implements UpdateChatByIdRepository {
  accountId: string
  id: string
  data: UpdateChatModel
  result = mockChatModel()

  async updateById (accountId: string, id: string, data: UpdateChatModel): Promise<UpdateChatByIdRepository.Result> {
    this.accountId = accountId
    this.id = id
    this.data = data
    return this.result
  }
}
