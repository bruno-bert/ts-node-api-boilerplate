export interface CheckChatById {
  checkById: (id: string) => Promise<CheckChatById.Result>
}

export namespace CheckChatById {
  export type Result = boolean
}
