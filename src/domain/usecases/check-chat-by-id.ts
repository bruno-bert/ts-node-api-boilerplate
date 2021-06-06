export interface CheckChatById {
  checkById: (accountId: string, id: string) => Promise<CheckChatById.Result>
}

export namespace CheckChatById {
  export type Result = boolean
}
