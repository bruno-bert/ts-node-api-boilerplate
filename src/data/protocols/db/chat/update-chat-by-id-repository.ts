import { ChatModel } from '@/domain/models'
import { UpdateChat } from '@/domain/usecases'

export interface UpdateChatByIdRepository {
  updateById: (accountId: string, id: string, data: UpdateChatByIdRepository.Params) => Promise<UpdateChatByIdRepository.Result>
}

export namespace UpdateChatByIdRepository {
  export type Result = ChatModel
  export type Params = UpdateChat.Params
}
