import { ChatMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddChatParams, mockAddAccountParams, mockUpdateChatParams } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'
import FakeObjectId from 'bson-objectid'

let chatCollection: Collection
let accountCollection: Collection

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return res.ops[0]._id
}

const makeSut = (): ChatMongoRepository => {
  return new ChatMongoRepository()
}

const makeObjectId = (): string => {
  return new FakeObjectId().id
}

describe('ChatMongoRepository', () => {
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

  describe('add()', () => {
    test('Should add a Chat on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddChatParams())
      const count = await chatCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    test('Should load all Chats on success', async () => {
      const accountId = await mockAccountId()
      const addChatModels = [mockAddChatParams(accountId), mockAddChatParams(accountId)]
      await chatCollection.insertMany(addChatModels)
      const sut = makeSut()
      const chats = await sut.loadAll(accountId)
      expect(chats.length).toBe(2)
      expect(chats[0].id).toBeTruthy()
      expect(chats[0].welcomeMessage).toBe(addChatModels[0].welcomeMessage)
      expect(chats[0].name).toBe(addChatModels[0].name)
      expect(chats[0].accountId.toString()).toBe(addChatModels[0].accountId.toString())
      expect(chats[1].id).toBeTruthy()
      expect(chats[1].welcomeMessage).toBe(addChatModels[1].welcomeMessage)
      expect(chats[1].name).toBe(addChatModels[1].name)
      expect(chats[1].accountId.toString()).toBe(addChatModels[1].accountId.toString())
    })

    test('Should load empty list', async () => {
      const accountId = await mockAccountId()
      const sut = makeSut()
      const Chats = await sut.loadAll(accountId)
      expect(Chats.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load Chat by id on success', async () => {
      const res = await chatCollection.insertOne(mockAddChatParams())
      const sut = makeSut()
      const Chat = await sut.loadById(res.ops[0].accountId, res.ops[0]._id)
      expect(Chat).toBeTruthy()
      expect(Chat.id).toBeTruthy()
    })

    test('Should return null if Chat does not exists', async () => {
      const accountId = await mockAccountId()
      const sut = makeSut()
      const Chat = await sut.loadById(accountId, makeObjectId())
      expect(Chat).toBeFalsy()
    })
  })

  describe('checkById()', () => {
    test('Should return true if Chat exists', async () => {
      const accountId = await mockAccountId()
      const res = await chatCollection.insertOne(mockAddChatParams(accountId))
      const sut = makeSut()
      const exists = await sut.checkById(accountId, res.ops[0]._id)
      expect(exists).toBe(true)
    })

    test('Should return false if Chat exists', async () => {
      const accountId = await mockAccountId()
      const sut = makeSut()
      const exists = await sut.checkById(accountId, makeObjectId())
      expect(exists).toBe(false)
    })
  })

  describe('updateById()', () => {
    test('Should return data if Chat exists', async () => {
      const accountId = await mockAccountId()
      const chat = mockAddChatParams(accountId)
      const res = await chatCollection.insertOne(chat)
      const sut = makeSut()
      const data = mockUpdateChatParams()
      const result = await sut.updateById(accountId, res.ops[0]._id, data)
      expect(result.welcomeMessage).toBe(data.welcomeMessage)
      expect(result.name).toBe(data.name)
    })

    test('Should return null if Chat does not exists', async () => {
      const accountId = await mockAccountId()
      const sut = makeSut()
      const data = mockUpdateChatParams()
      const result = await sut.updateById(accountId, makeObjectId(), data)
      expect(result).toBe(null)
    })
  })
})
