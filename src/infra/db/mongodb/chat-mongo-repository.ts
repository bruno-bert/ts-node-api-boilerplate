import { MongoHelper, QueryBuilder } from '@/infra/db'
import { AddChatRepository, LoadChatsRepository, LoadChatByIdRepository, CheckChatByIdRepository, UpdateChatByIdRepository } from '@/data/protocols/db'
import { ObjectId } from 'mongodb'
import { ChatModel } from '@/domain/models'

export class ChatMongoRepository implements AddChatRepository, LoadChatsRepository, LoadChatByIdRepository, CheckChatByIdRepository, UpdateChatByIdRepository {
  async add (data: AddChatRepository.Params): Promise<ChatModel> {
    const ChatCollection = await MongoHelper.getCollection('chats')
    const document = await ChatCollection.insertOne(data)

    if (document.ops) {
      return MongoHelper.map(document.ops[0])
    } else {
      return null
    }
  }

  async loadAll (accountId: string): Promise<LoadChatsRepository.Result> {
    const ChatCollection = await MongoHelper.getCollection('chats')
    const query = new QueryBuilder()
      .project({
        _id: 1,
        welcomeMessage: 1,
        name: 1,
        date: 1,
        accountId: 1
      })
      .match({
        accountId: accountId
      })
      .build()
    const Chats = await ChatCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(Chats)
  }

  async loadById (accountId: string, id: string): Promise<LoadChatByIdRepository.Result> {
    const ChatCollection = await MongoHelper.getCollection('chats')
    const Chat = await ChatCollection.findOne({
      accountId,
      _id: new ObjectId(id)
    })
    return Chat && MongoHelper.map(Chat)
  }

  async updateById (accountId: string, id: string, data: UpdateChatByIdRepository.Params): Promise<LoadChatByIdRepository.Result> {
    const ChatCollection = await MongoHelper.getCollection('chats')

    const query = {
      accountId,
      _id: new ObjectId(id)
    }

    const update = { $set: data }

    const document = await ChatCollection.findOneAndUpdate(query , update, { returnDocument: 'after' })
    if (document.value) {
      return MongoHelper.map(document.value)
    } else {
      return null
    }
  }

  async checkById (accountId: string, id: string): Promise<CheckChatByIdRepository.Result> {
    const ChatCollection = await MongoHelper.getCollection('chats')
    const Chat = await ChatCollection.findOne({
      accountId, // new ObjectId(accountId),
      _id: new ObjectId(id)
    }, {
      projection: {
        _id: 1
      }
    })
    return Chat !== null
  }
}
