export interface CheckChatByIdRepository {
  checkById: (accountId: string, id: string) => Promise<CheckChatByIdRepository.Result>
}

export namespace CheckChatByIdRepository {
  export type Result = boolean
}
