import { DbCheckChatById } from '@/data/usecases'
import { CheckChatByIdRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbCheckChatById
  checkChatByIdRepositorySpy: CheckChatByIdRepositorySpy
}
const mockAccountId = (): string => {
  return faker.datatype.uuid()
}

const makeSut = (): SutTypes => {
  const checkChatByIdRepositorySpy = new CheckChatByIdRepositorySpy()
  const sut = new DbCheckChatById(checkChatByIdRepositorySpy)
  return {
    sut,
    checkChatByIdRepositorySpy
  }
}

let ChatId: string

describe('DbLoadChatById', () => {
  beforeEach(() => {
    ChatId = faker.datatype.uuid()
  })

  test('Should call CheckChatByIdRepository', async () => {
    const { sut, checkChatByIdRepositorySpy } = makeSut()
    await sut.checkById(mockAccountId(),ChatId)
    expect(checkChatByIdRepositorySpy.id).toBe(ChatId)
  })

  test('Should return true if CheckChatByIdRepository returns true', async () => {
    const { sut } = makeSut()
    const exists = await sut.checkById(mockAccountId(),ChatId)
    expect(exists).toBe(true)
  })

  test('Should return false if CheckChatByIdRepository returns false', async () => {
    const { sut, checkChatByIdRepositorySpy } = makeSut()
    checkChatByIdRepositorySpy.result = false
    const exists = await sut.checkById(mockAccountId(),ChatId)
    expect(exists).toBe(false)
  })

  test('Should throw if CheckChatByIdRepository throws', async () => {
    const { sut, checkChatByIdRepositorySpy } = makeSut()
    jest.spyOn(checkChatByIdRepositorySpy, 'checkById').mockImplementationOnce(throwError)
    const promise = sut.checkById(mockAccountId(),ChatId)
    await expect(promise).rejects.toThrow()
  })
})
