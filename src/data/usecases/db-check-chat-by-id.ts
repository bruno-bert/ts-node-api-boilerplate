import { CheckChatById } from '@/domain/usecases'
import { CheckChatByIdRepository } from '@/data/protocols'

export class DbCheckChatById implements CheckChatById {
  constructor (private readonly checkChatByIdRepository: CheckChatByIdRepository) {}

  async checkById (id: string): Promise<CheckChatById.Result> {
    return this.checkChatByIdRepository.checkById(id)
  }
}
