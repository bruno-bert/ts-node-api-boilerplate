import { ChatModel } from '@/domain/models'

export interface AddChat {
  add: (data: AddChat.Params) => Promise<AddChat.Result>
}

export namespace AddChat {
  export type Result = Omit<ChatModel, 'id'>
  export type Params = Omit<ChatModel, 'id'>
}
