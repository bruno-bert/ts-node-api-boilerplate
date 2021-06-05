import { ChatModel } from '@/domain/models'

export interface LoadChats {
  load: (accountId: string) => Promise<LoadChats.Result>
}

export namespace LoadChats {
  export type Result = ChatModel[]
}
