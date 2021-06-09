import { UpdateChat, UpdateChatById } from '@/domain/usecases'
import { CheckChatByIdRepository, UpdateChatByIdRepository } from '@/data/protocols'

export class DbUpdateChatById implements UpdateChatById {
  constructor (private readonly checkChatByIdRepository: CheckChatByIdRepository,
    private readonly updateChatByIdRepository: UpdateChatByIdRepository) {}

  async updateById (accountId: string, id: string, data: UpdateChat.Params): Promise<UpdateChat.Result> {
    const res = this.checkChatByIdRepository.checkById(accountId, id)
    if (!res) return null
    return this.updateChatByIdRepository.updateById(accountId, id, data)
  }
}
