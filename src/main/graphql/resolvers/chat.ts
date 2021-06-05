import { adaptResolver } from '@/main/adapters'
import { makeLoadChatsController } from '@/main/factories'

export default {
  Query: {
    chats: async (parent: any, args: any, context: any) => adaptResolver(makeLoadChatsController(), args, context)
  }
}
