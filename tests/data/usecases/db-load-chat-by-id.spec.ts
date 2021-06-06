import { DbLoadChatById } from '@/data/usecases'
import { LoadChatByIdRepositorySpy } from '@/tests/data/mocks'
import { throwError, mockChatModel } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadChatById
  loadChatByIdRepositorySpy: LoadChatByIdRepositorySpy
}
const mockAccountId = (): string => {
  return faker.datatype.uuid()
}

const makeSut = (): SutTypes => {
  const loadChatByIdRepositorySpy = new LoadChatByIdRepositorySpy()
  const sut = new DbLoadChatById(loadChatByIdRepositorySpy)
  return {
    sut,
    loadChatByIdRepositorySpy
  }
}

let chatId: string

describe('DbLoadChatById', () => {
  beforeEach(() => {
    chatId = faker.datatype.uuid()
  })

  test('Should call loadChatByIdRepository', async () => {
    const { sut, loadChatByIdRepositorySpy } = makeSut()
    const accountId = mockAccountId()
    const loadByIdSpy = jest.spyOn(loadChatByIdRepositorySpy, 'loadById')
    await sut.loadById(accountId,chatId)
    expect(loadByIdSpy).toHaveBeenCalledWith(accountId, chatId)
  })

  test('Should return chat model if loadChatByIdRepository returns chat model', async () => {
    const { sut, loadChatByIdRepositorySpy } = makeSut()
    const chatModel = mockChatModel()
    loadChatByIdRepositorySpy.result = chatModel
    const chat = await sut.loadById(mockAccountId(), chatId)
    expect(chat).toBe(chatModel)
  })

  test('Should return null if loadChatByIdRepository returns null', async () => {
    const { sut, loadChatByIdRepositorySpy } = makeSut()
    loadChatByIdRepositorySpy.result = null
    const exists = await sut.loadById(mockAccountId(),chatId)
    expect(exists).toBe(null)
  })

  test('Should throw if loadChatByIdRepository throws', async () => {
    const { sut, loadChatByIdRepositorySpy } = makeSut()
    jest.spyOn(loadChatByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById(mockAccountId(),chatId)
    await expect(promise).rejects.toThrow()
  })
})
