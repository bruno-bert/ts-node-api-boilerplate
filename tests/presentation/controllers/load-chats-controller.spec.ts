import { LoadChatsController } from '@/presentation/controllers'
import { ok, serverError, noContent } from '@/presentation/helpers'
import { LoadChatsSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): LoadChatsController.Request => ({ accountId: faker.datatype.uuid() })

type SutTypes = {
  sut: LoadChatsController
  loadChatsSpy: LoadChatsSpy
}

const makeSut = (): SutTypes => {
  const loadChatsSpy = new LoadChatsSpy()
  const sut = new LoadChatsController(loadChatsSpy)
  return {
    sut,
    loadChatsSpy
  }
}

describe('LoadChats Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadChats with correct value', async () => {
    const { sut, loadChatsSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadChatsSpy.accountId).toBe(request.accountId)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadChatsSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadChatsSpy.result))
  })

  test('Should return 204 if LoadChats returns empty', async () => {
    const { sut, loadChatsSpy } = makeSut()
    loadChatsSpy.result = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadChats throws', async () => {
    const { sut, loadChatsSpy } = makeSut()
    jest.spyOn(loadChatsSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
