import { LoadChatDetailController } from '@/presentation/controllers'
import { ok, serverError, notFound, badRequest } from '@/presentation/helpers'
import { LoadChatByIdSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'
import { InvalidParamError } from '@/presentation/errors'

const mockRequest = (): LoadChatDetailController.Request => ({ accountId: faker.datatype.uuid(), id: '123' })

type SutTypes = {
  sut: LoadChatDetailController
  loadChatByIdSpy: LoadChatByIdSpy
  validationSpy: ValidationSpy

}

const makeSut = (): SutTypes => {
  const loadChatByIdSpy = new LoadChatByIdSpy()
  const validationSpy = new ValidationSpy()

  const sut = new LoadChatDetailController(loadChatByIdSpy, validationSpy)
  return {
    sut,
    loadChatByIdSpy,
    validationSpy
  }
}

describe('LoadChatDetail Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadChatDetail with correct value', async () => {
    const { sut, loadChatByIdSpy } = makeSut()
    const request = mockRequest()
    const loadByIdSpy = jest.spyOn(loadChatByIdSpy,'loadById')
    await sut.handle(request)
    expect(loadByIdSpy).toHaveBeenCalledWith(request.accountId,request.id)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadChatByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadChatByIdSpy.result))
  })

  test('Should return 404 when chat does not exist', async () => {
    const { sut, loadChatByIdSpy } = makeSut()
    jest.spyOn(loadChatByIdSpy, 'loadById').mockResolvedValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new InvalidParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should return 500 if LoadChatDetail throws', async () => {
    const { sut, loadChatByIdSpy } = makeSut()
    jest.spyOn(loadChatByIdSpy, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
