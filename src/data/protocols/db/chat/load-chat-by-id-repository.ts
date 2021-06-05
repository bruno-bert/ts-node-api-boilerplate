import { ChatModel } from '@/domain/models'

export interface LoadChatByIdRepository {
  loadById: (id: string) => Promise<LoadChatByIdRepository.Result>
}

export namespace LoadChatByIdRepository {
  export type Result = ChatModel
}
