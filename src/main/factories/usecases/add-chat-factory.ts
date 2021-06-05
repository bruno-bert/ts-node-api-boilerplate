import { AddChat } from '@/domain/usecases'
import { ChatMongoRepository } from '@/infra/db'
import { DbAddChat } from '@/data/usecases'

export const makeDbAddChat = (): AddChat => {
  const chatMongoRepository = new ChatMongoRepository()
  return new DbAddChat(chatMongoRepository)
}
