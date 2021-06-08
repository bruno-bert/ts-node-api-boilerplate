import { ChatMongoRepository } from '@/infra/db'
import { UpdateChatById } from '@/domain/usecases'
import { DbUpdateChatById } from '@/data/usecases'

export const makeDbUpdateChatById = (): UpdateChatById => {
  const chatMongoRepository = new ChatMongoRepository()
  return new DbUpdateChatById(chatMongoRepository, chatMongoRepository)
}
