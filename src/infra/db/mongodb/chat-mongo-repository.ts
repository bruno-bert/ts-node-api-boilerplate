import { MongoHelper, QueryBuilder } from '@/infra/db'
import { AddChatRepository, LoadChatsRepository, LoadChatByIdRepository, CheckChatByIdRepository } from '@/data/protocols/db'

import { ObjectId } from 'mongodb'

export class ChatMongoRepository implements AddChatRepository, LoadChatsRepository, LoadChatByIdRepository, CheckChatByIdRepository {
  async add (data: AddChatRepository.Params): Promise<void> {
    const ChatCollection = await MongoHelper.getCollection('chats')
    await ChatCollection.insertOne(data)
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

  async loadById (id: string): Promise<LoadChatByIdRepository.Result> {
    const ChatCollection = await MongoHelper.getCollection('chats')
    const Chat = await ChatCollection.findOne({ _id: new ObjectId(id) })
    return Chat && MongoHelper.map(Chat)
  }

  async checkById (id: string): Promise<CheckChatByIdRepository.Result> {
    const ChatCollection = await MongoHelper.getCollection('chats')
    const Chat = await ChatCollection.findOne({
      _id: new ObjectId(id)
    }, {
      projection: {
        _id: 1
      }
    })
    return Chat !== null
  }
}
