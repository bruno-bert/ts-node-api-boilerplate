import { ChatModel } from '../models'

export interface LoadChatById {
  loadById: (accountId: string, id: string) => Promise<LoadChatById.Result>
}

export namespace LoadChatById {
  export type Result = ChatModel
}
