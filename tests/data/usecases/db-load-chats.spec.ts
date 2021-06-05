import { DbLoadChats } from '@/data/usecases'
import { LoadChatsRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadChats
  loadChatsRepositorySpy: LoadChatsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadChatsRepositorySpy = new LoadChatsRepositorySpy()
  const sut = new DbLoadChats(loadChatsRepositorySpy)
  return {
    sut,
    loadChatsRepositorySpy
  }
}

describe('DbLoadChats', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadChatsRepository', async () => {
    const { sut, loadChatsRepositorySpy } = makeSut()
    const accountId = faker.datatype.uuid()
    await sut.load(accountId)
    expect(loadChatsRepositorySpy.accountId).toBe(accountId)
  })

  test('Should return a list of Chats on success', async () => {
    const { sut, loadChatsRepositorySpy } = makeSut()
    const Chats = await sut.load(faker.datatype.uuid())
    expect(Chats).toEqual(loadChatsRepositorySpy.result)
  })

  test('Should throw if LoadChatsRepository throws', async () => {
    const { sut, loadChatsRepositorySpy } = makeSut()
    jest.spyOn(loadChatsRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load(faker.datatype.uuid())
    await expect(promise).rejects.toThrow()
  })
})
