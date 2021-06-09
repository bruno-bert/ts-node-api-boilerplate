import { ChatModel } from '@/domain/models'
import { AddChat } from '@/domain/usecases'

export interface AddChatRepository {
  add: (data: AddChatRepository.Params) => Promise<AddChatRepository.Result>
}

export namespace AddChatRepository {
  export type Params = AddChat.Params
  export type Result = ChatModel
}
