import { DbAddChat } from '@/data/usecases'
import { AddChatRepositorySpy } from '@/tests/data/mocks'
import { throwError, mockAddChatParams } from '@/tests/domain/mocks'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbAddChat
  addChatRepositorySpy: AddChatRepositorySpy
}

const makeSut = (): SutTypes => {
  const addChatRepositorySpy = new AddChatRepositorySpy()
  const sut = new DbAddChat(addChatRepositorySpy)
  return {
    sut,
    addChatRepositorySpy
  }
}

describe('DbAddChat Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddChatRepository with correct values', async () => {
    const { sut, addChatRepositorySpy } = makeSut()
    const ChatData = mockAddChatParams()
    await sut.add(ChatData)
    expect(addChatRepositorySpy.params).toEqual(ChatData)
  })

  test('Should throw if AddChatRepository throws', async () => {
    const { sut, addChatRepositorySpy } = makeSut()
    jest.spyOn(addChatRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddChatParams())
    await expect(promise).rejects.toThrow()
  })
})
