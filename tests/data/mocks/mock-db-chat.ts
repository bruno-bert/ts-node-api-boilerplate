import { AddChatRepository, LoadChatByIdRepository, LoadChatsRepository, CheckChatByIdRepository } from '@/data/protocols'
import { mockChatModel, mockChatModels } from '@/tests/domain/mocks'

export class AddChatRepositorySpy implements AddChatRepository {
  params: AddChatRepository.Params

  async add (params: AddChatRepository.Params): Promise<void> {
    this.params = params
  }
}

export class LoadChatByIdRepositorySpy implements LoadChatByIdRepository {
  id: string
  result = mockChatModel()

  async loadById (id: string): Promise<LoadChatByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class CheckChatByIdRepositorySpy implements CheckChatByIdRepository {
  id: string
  result = true

  async checkById (id: string): Promise<CheckChatByIdRepository.Result> {
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
