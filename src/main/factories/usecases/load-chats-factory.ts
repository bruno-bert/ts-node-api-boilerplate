import { ChatMongoRepository } from '@/infra/db'
import { LoadChats } from '@/domain/usecases'
import { DbLoadChats } from '@/data/usecases'

export const makeDbLoadChats = (): LoadChats => {
  const chatMongoRepository = new ChatMongoRepository()
  return new DbLoadChats(chatMongoRepository)
}
