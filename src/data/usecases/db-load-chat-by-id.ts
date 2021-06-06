import { LoadChatById } from '@/domain/usecases'
import { LoadChatByIdRepository } from '@/data/protocols'

export class DbLoadChatById implements LoadChatById {
  constructor (private readonly loadChatByIdRepository: LoadChatByIdRepository) {}

  async loadById (accountId: string, id: string): Promise<LoadChatById.Result> {
    return this.loadChatByIdRepository.loadById(accountId, id)
  }
}
