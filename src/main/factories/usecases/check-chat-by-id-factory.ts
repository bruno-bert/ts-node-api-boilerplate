import { ChatMongoRepository } from '@/infra/db'
import { CheckChatById } from '@/domain/usecases'
import { DbCheckChatById } from '@/data/usecases'

export const makeDbCheckChatById = (): CheckChatById => {
  const chatMongoRepository = new ChatMongoRepository()
  return new DbCheckChatById(chatMongoRepository)
}
