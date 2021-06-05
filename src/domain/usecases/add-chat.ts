import { ChatModel } from '@/domain/models'

export interface AddChat {
  add: (data: AddChat.Params) => Promise<void>
}

export namespace AddChat {
  export type Params = Omit<ChatModel, 'id'>
}
