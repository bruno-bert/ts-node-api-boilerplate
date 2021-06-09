import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db'
import faker from 'faker'

import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import { mockChatModel } from '@/tests/domain/mocks'
import FakeObjectId from 'bson-objectid'

import MockDate from 'mockdate'
import { ChatModel } from '@/domain/models'

let chatCollection: Collection
let accountCollection: Collection
const mockedDate = new Date(2021,0,1)

const makeObjectId = (): string => {
  return new FakeObjectId().toHexString()
}

const mockRequest = (accountId: string = faker.random.word()): Omit<ChatModel,'id'|'date'> => {
  return {
    welcomeMessage: faker.random.words(),
    name: faker.random.word(),
    accountId: accountId
  }
}

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
    MockDate.set(mockedDate)
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    MockDate.reset()
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
        .send(mockRequest())
        .expect(403)
    })

    test('Should return 200 on add chat with valid accessToken', async () => {
      const { accessToken, accountId } = await mockAccessToken()
      const chat = mockRequest(accountId)

      const response = await request(app)
        .post('/api/chats')
        .set('x-access-token', accessToken)
        .send(chat)
        .expect(200)

      const body: ChatModel = response.body
      expect(body.id).toBeTruthy()
      expect(body.welcomeMessage).toBe(chat.welcomeMessage)
      expect(body.name).toBe(chat.name)
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

  describe('PUT /chats/:id', () => {
    test('Should return 403 on update chat without accessToken', async () => {
      await request(app)
        .put('/api/chats/any_chat_id')
        .expect(403)
    })

    test('Should return 400 on update chat with valid token, but without a body', async () => {
      const { accessToken } = await mockAccessToken()
      const fakeId = makeObjectId()
      await request(app)
        .put(`/api/chats/${fakeId}`)
        .set('x-access-token', accessToken)
        .expect(400)
    })

    test('Should return 404 on update chat with valid token, but chat does not exist', async () => {
      const { accessToken } = await mockAccessToken()
      const fakeId = makeObjectId()
      await request(app)
        .put(`/api/chats/${fakeId}`)
        .send(mockRequest())
        .set('x-access-token', accessToken)
        .expect(404)
    })

    test('Should return 400 on update chat with valid token by invalid id', async () => {
      const { accessToken } = await mockAccessToken()
      const fakeId = 'invalid_id'
      await request(app)
        .put(`/api/chats/${fakeId}`)
        .set('x-access-token', accessToken)
        .expect(400)
    })

    test('Should return 400 on update chat with valid token but invalid info in body', async () => {
      const { accessToken } = await mockAccessToken()
      const validId = makeObjectId()

      await request(app)
        .put(`/api/chats/${validId}`)
        .send({ data: { welcomeMessage: '' } })
        .set('x-access-token', accessToken)
        .expect(400)

      await request(app)
        .put(`/api/chats/${validId}`)
        .send({ data: { name: '' } })
        .set('x-access-token', accessToken)
        .expect(400)

      await request(app)
        .put(`/api/chats/${validId}`)
        .send({ data: null })
        .set('x-access-token', accessToken)
        .expect(400)

      await request(app)
        .put(`/api/chats/${validId}`)
        .send({ })
        .set('x-access-token', accessToken)
        .expect(400)

      await request(app)
        .put(`/api/chats/${validId}`)
        .send(null)
        .set('x-access-token', accessToken)
        .expect(400)
    })

    test('Should return 200 on update existing chat with valid accessToken and valid Body', async () => {
      const { accessToken, accountId } = await mockAccessToken()
      const res = await chatCollection.insertOne(mockChatModel(accountId))
      const id = res.ops[0]._id

      const validBody = mockRequest(accountId)

      const mapExpected = (body: any): any => {
        return { ...body, id: String(id),accountId: String(accountId) ,date: mockedDate.toISOString() }
      }

      await request(app)
        .put(`/api/chats/${id}`)
        .send(validBody)
        .set('x-access-token', accessToken)
        .expect(200)
        .expect(mapExpected(validBody))
    })
  })
})
