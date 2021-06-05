import { ChatModel } from '@/domain/models'
import { AddChat } from '@/domain/usecases'

import faker from 'faker'

export const mockChatModel = (): ChatModel => {
  return {
    id: faker.datatype.uuid(),
    name: faker.random.words(),
    welcomeMessage: faker.random.words(),
    date: faker.date.recent(),
    accountId: faker.random.words()
  }
}

export const mockChatModels = (): ChatModel[] => [
  mockChatModel(),
  mockChatModel()
]

export const mockAddChatParams = (accountId: string = faker.datatype.uuid()): AddChat.Params => ({
  welcomeMessage: faker.random.words(),
  name: faker.random.words(),
  date: faker.date.recent(),
  accountId: accountId
})
