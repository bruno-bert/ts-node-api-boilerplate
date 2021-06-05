import { ChatModel } from '@/domain/models'

export interface LoadChatsRepository {
  loadAll: (accountId: string) => Promise<LoadChatsRepository.Result>
}

export namespace LoadChatsRepository {
  export type Result = ChatModel[]
}
