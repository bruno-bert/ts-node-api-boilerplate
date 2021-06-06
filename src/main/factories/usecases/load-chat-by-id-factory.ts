import { ChatMongoRepository } from '@/infra/db'
import { LoadChatById } from '@/domain/usecases'
import { DbLoadChatById } from '@/data/usecases'

export const makeDbLoadChatById = (): LoadChatById => {
  const chatMongoRepository = new ChatMongoRepository()
  return new DbLoadChatById(chatMongoRepository)
}
