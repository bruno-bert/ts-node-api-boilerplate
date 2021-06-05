import { makeApolloServer } from '@/tests/main/graphql/helpers'
import { MongoHelper } from '@/infra/db'
import env from '@/main/config/env'

import { ApolloServer, gql } from 'apollo-server-express'
import { createTestClient } from 'apollo-server-integration-testing'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import { ChatModel } from '@/domain/models'

let chatCollection: Collection
let accountCollection: Collection
let apolloServer: ApolloServer

const mockChat = (now: Date, accountId: string): Omit<ChatModel,'id'> => ({
  name: 'John',
  welcomeMessage: 'Hello Chat',
  accountId,
  date: now
})

const mockAccessToken = async (): Promise<{ accessToken: string, accountId: string}> => {
  const res = await accountCollection.insertOne({
    name: 'Rodrigo',
    email: 'rodrigo.manguinho@gmail.com',
    password: '123',
    role: 'admin'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return { accessToken, accountId: id }
}

describe('chat GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    chatCollection = await MongoHelper.getCollection('chats')
    await chatCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('chats Query', () => {
    const chatsQuery = gql`
      query chats {
        chats {
          id
          name
          welcomeMessage
          date
          accountId
        }
      }
    `

    test('Should return chats', async () => {
      const { accessToken, accountId } = await mockAccessToken()
      const now = new Date()
      await chatCollection.insertOne(mockChat(now, accountId))

      const { query } = createTestClient({
        apolloServer,
        extendMockRequest: {
          headers: {
            'x-access-token': accessToken
          }
        }
      })

      const res: any = await query(chatsQuery)
      expect(res.data.chats.length).toBe(1)
      expect(res.data.chats[0].id).toBeTruthy()
      expect(res.data.chats[0].name).toBe('John')
      expect(res.data.chats[0].date).toBe(now.toISOString())
      expect(res.data.chats[0].welcomeMessage).toBe('Hello Chat')
      expect(res.data.chats[0].accountId as String).toBe(accountId.toString())
    })

    test('Should not return chat form other accounts', async () => {
      const { accessToken, accountId } = await mockAccessToken()
      const now = new Date()
      await chatCollection.insertOne(mockChat(now, accountId))
      await chatCollection.insertOne(mockChat(now, 'other_account'))

      const { query } = createTestClient({
        apolloServer,
        extendMockRequest: {
          headers: {
            'x-access-token': accessToken
          }
        }
      })

      const res: any = await query(chatsQuery)
      expect(res.data.chats.length).toBe(1)
      expect(res.data.chats[0].id).toBeTruthy()
      expect(res.data.chats[0].name).toBe('John')
      expect(res.data.chats[0].date).toBe(now.toISOString())
      expect(res.data.chats[0].welcomeMessage).toBe('Hello Chat')
      expect(res.data.chats[0].accountId as String).toBe(accountId.toString())
    })

    test('Should return AccessDeniedError if no token is provided', async () => {
      await chatCollection.insertOne(mockChat(new Date(), 'any_id'))
      const { query } = createTestClient({ apolloServer })
      const res: any = await query(chatsQuery)
      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('Access denied')
    })
  })
})
