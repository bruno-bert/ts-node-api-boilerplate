import { AddChat } from '@/domain/usecases'

export interface AddChatRepository {
  add: (data: AddChatRepository.Params) => Promise<void>
}

export namespace AddChatRepository {
  export type Params = AddChat.Params
}
