import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db'
import faker from 'faker'

import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import { ChatModel } from '@/domain/models'
import { mockChatModel } from '@/tests/domain/mocks'
import FakeObjectId from 'bson-objectid'

let chatCollection: Collection
let accountCollection: Collection

const makeObjectId = (): string => {
  return new FakeObjectId().toHexString()
}

const mockChat = (accountId: string = faker.random.word()): Omit<ChatModel,'id' | 'date'> => ({
  name: 'John',
  welcomeMessage: 'Hello Chat',
  accountId: accountId
})

const mockAccessToken = async (role: string = undefined): Promise<{accessToken: string, accountId: string}> => {
  const res = await accountCollection.insertOne({
    name: 'Bruno',
    email: 'bruno.bert@gmail.com',
    password: '123',
    role
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

describe('Chat Routes', () => {
  beforeAll(async () => {
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

  describe('POST /chats', () => {
    test('Should return 403 on add chat without accessToken', async () => {
      await request(app)
        .post('/api/chats')
        .send(mockChat())
        .expect(403)
    })

    test('Should return 200 on add chat with valid accessToken', async () => {
      const { accessToken, accountId } = await mockAccessToken()
      const chat = mockChat(accountId)
      await request(app)
        .post('/api/chats')
        .set('x-access-token', accessToken)
        .send(chat)
        .expect(200)
    })
  })

  describe('GET /chats', () => {
    test('Should return 403 on load chats without accessToken', async () => {
      await request(app)
        .get('/api/chats')
        .expect(403)
    })

    test('Should return 204 on load chats with valid accessToken', async () => {
      const { accessToken } = await mockAccessToken()
      await request(app)
        .get('/api/chats')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })

  describe('GET /chats/:chatId', () => {
    test('Should return 403 on load chat details without accessToken', async () => {
      await request(app)
        .get('/api/chats/any_chat_id')
        .expect(403)
    })

    test('Should return 404 on load chat details with valid token that does not exist', async () => {
      const { accessToken } = await mockAccessToken()
      const fakeId = makeObjectId()
      await request(app)
        .get(`/api/chats/${fakeId}`)
        .set('x-access-token', accessToken)
        .expect(404)
    })

    test('Should return 400 on load chat details with valid token by invalid id', async () => {
      const { accessToken } = await mockAccessToken()
      const fakeId = 'invalid_id'
      await request(app)
        .get(`/api/chats/${fakeId}`)
        .set('x-access-token', accessToken)
        .expect(400)
    })

    test('Should return 200 on load existing chat with valid accessToken', async () => {
      const { accessToken, accountId } = await mockAccessToken()
      const res = await chatCollection.insertOne(mockChatModel(accountId))
      const id = res.ops[0]._id
      await request(app)
        .get(`/api/chats/${id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
