import { ChatModel } from '@/domain/models'
import { AddChat, UpdateChat } from '@/domain/usecases'

import faker from 'faker'

export const mockChatModel = (accountId: string = faker.random.words()): ChatModel => {
  return {
    id: faker.datatype.uuid(),
    name: faker.random.words(),
    welcomeMessage: faker.random.words(),
    date: faker.date.recent(),
    accountId
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

export const mockAddChatResult = (accountId: string = faker.datatype.uuid()): AddChat.Result => ({
  welcomeMessage: faker.random.words(),
  name: faker.random.words(),
  date: faker.date.recent(),
  accountId: accountId
})

export const mockUpdateChatParams = (): UpdateChat.Params => ({
  welcomeMessage: faker.random.words(),
  name: faker.random.words(),
  date: new Date()
})
