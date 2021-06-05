import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db'

import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import { ChatModel } from '@/domain/models'

let chatCollection: Collection
let accountCollection: Collection

const mockChat = (): Omit<ChatModel,'id'> => ({
  name: 'John',
  welcomeMessage: 'Hello Chat',
  accountId: 'any_account',
  date: new Date()
})

const mockAccessToken = async (): Promise<string> => {
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
  return accessToken
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

    test('Should return 204 on add chat with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .post('/api/chats')
        .set('x-access-token', accessToken)
        .send(mockChat())
        .expect(204)
    })
  })

  describe('GET /chats', () => {
    test('Should return 403 on load chats without accessToken', async () => {
      await request(app)
        .get('/api/chats')
        .expect(403)
    })

    test('Should return 204 on load chats with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .get('/api/chats')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
