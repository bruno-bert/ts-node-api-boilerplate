import { ChatModel } from '../models'

export interface UpdateChatById {
  updateById: (accountId: string, id: string, data: UpdateChat.Params) => Promise<UpdateChatById.Result>
}

export namespace UpdateChatById {
  export type Result = ChatModel
}

export type UpdateChatModel = {
  name: string
  welcomeMessage: string
  date: Date
}

export namespace UpdateChat {
  export type Params = UpdateChatModel
}
