import { AddChat } from '@/domain/usecases'
import { AddChatRepository } from '@/data/protocols'

export class DbAddChat implements AddChat {
  constructor (private readonly addChatRepository: AddChatRepository) {}

  async add (data: AddChat.Params): Promise<void> {
    await this.addChatRepository.add(data)
  }
}
