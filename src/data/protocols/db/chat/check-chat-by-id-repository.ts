export interface CheckChatByIdRepository {
  checkById: (id: string) => Promise<CheckChatByIdRepository.Result>
}

export namespace CheckChatByIdRepository {
  export type Result = boolean
}
