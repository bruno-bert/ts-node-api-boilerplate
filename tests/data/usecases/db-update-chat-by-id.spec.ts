import { DbUpdateChatById } from '@/data/usecases'
import { CheckChatByIdRepositorySpy, UpdateChatByIdRepositorySpy } from '@/tests/data/mocks'
import { throwError, mockChatModel, mockUpdateChatParams } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbUpdateChatById
  checkChatByIdRepositorySpy: CheckChatByIdRepositorySpy
  updateChatByIdRepositorySpy: UpdateChatByIdRepositorySpy
}
const mockAccountId = (): string => {
  return faker.datatype.uuid()
}

const makeSut = (): SutTypes => {
  const checkChatByIdRepositorySpy = new CheckChatByIdRepositorySpy()
  const updateChatByIdRepositorySpy = new UpdateChatByIdRepositorySpy()
  const sut = new DbUpdateChatById(checkChatByIdRepositorySpy, updateChatByIdRepositorySpy)
  return {
    sut,
    checkChatByIdRepositorySpy,
    updateChatByIdRepositorySpy
  }
}

let accountId: string
let chatId: string

describe('DbUpdateChatById', () => {
  beforeEach(() => {
    accountId = mockAccountId()
    chatId = faker.datatype.uuid()
  })

  test('Should call checkChatByIdRepository and updateChatByIdRepository with correct values', async () => {
    const { sut, checkChatByIdRepositorySpy, updateChatByIdRepositorySpy } = makeSut()
    const accountId = mockAccountId()
    const checkByIdSpy = jest.spyOn(checkChatByIdRepositorySpy, 'checkById')
    const updateByIdSpy = jest.spyOn(updateChatByIdRepositorySpy, 'updateById')
    const data = mockUpdateChatParams()
    await sut.updateById(accountId, chatId, data)
    expect(checkByIdSpy).toHaveBeenCalledWith(accountId, chatId)
    expect(updateByIdSpy).toHaveBeenCalledWith(accountId, chatId, data)
  })

  test('Should return chat model if updateChatByIdRepository returns chat model', async () => {
    const { sut, updateChatByIdRepositorySpy } = makeSut()
    const chatModel = mockChatModel()
    updateChatByIdRepositorySpy.result = chatModel
    const data = mockUpdateChatParams()
    const chat = await sut.updateById(accountId, chatId, data)
    expect(chat).toBe(chatModel)
  })

  test('Should return null if updateChatByIdRepository returns null', async () => {
    const { sut, updateChatByIdRepositorySpy } = makeSut()
    updateChatByIdRepositorySpy.result = null
    const data = mockUpdateChatParams()
    const result = await sut.updateById(accountId,chatId, data)
    expect(result).toBe(null)
  })

  test('Should throw if checkChatByIdRepository  throws', async () => {
    const { sut, checkChatByIdRepositorySpy } = makeSut()
    jest.spyOn(checkChatByIdRepositorySpy, 'checkById').mockImplementationOnce(throwError)
    const data = mockUpdateChatParams()
    const promise = sut.updateById(accountId,chatId, data)
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if updateChatByIdRepository throws', async () => {
    const { sut, updateChatByIdRepositorySpy } = makeSut()
    jest.spyOn(updateChatByIdRepositorySpy, 'updateById').mockImplementationOnce(throwError)
    const data = mockUpdateChatParams()
    const promise = sut.updateById(accountId,chatId, data)
    await expect(promise).rejects.toThrow()
  })
})
