import { ChatModel } from '@/domain/models'

export interface LoadChatByIdRepository {
  loadById: (accountId: string, id: string) => Promise<LoadChatByIdRepository.Result>
}

export namespace LoadChatByIdRepository {
  export type Result = ChatModel
}
