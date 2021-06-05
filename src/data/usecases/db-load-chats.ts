import { LoadChats } from '@/domain/usecases'
import { LoadChatsRepository } from '@/data/protocols'

export class DbLoadChats implements LoadChats {
  constructor (private readonly loadChatsRepository: LoadChatsRepository) {}

  async load (accountId: string): Promise<LoadChats.Result> {
    return this.loadChatsRepository.loadAll(accountId)
  }
}
