import { UpdateChatController } from '@/presentation/controllers'
import { ok, serverError, notFound, badRequest } from '@/presentation/helpers'
import { CheckChatByIdSpy, UpdateChatByIdSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { throwError, mockUpdateChatParams } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'
import { MissingParamError } from '@/presentation/errors'

const mockRequest = (): UpdateChatController.Request => (
  { accountId: faker.datatype.uuid(), id: '123', ...mockUpdateChatParams() }
)

type SutTypes = {
  sut: UpdateChatController
  checkChatByIdSpy: CheckChatByIdSpy
  updateChatByIdSpy: UpdateChatByIdSpy
  validationSpy: ValidationSpy

}

const makeSut = (): SutTypes => {
  const checkChatByIdSpy = new CheckChatByIdSpy()
  const updateChatByIdSpy = new UpdateChatByIdSpy()
  const validationSpy = new ValidationSpy()

  const sut = new UpdateChatController(checkChatByIdSpy, updateChatByIdSpy, validationSpy)
  return {
    sut,
    checkChatByIdSpy,
    updateChatByIdSpy,
    validationSpy
  }
}

describe('UpdateChatController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call checkChatByIdSpy with correct value', async () => {
    const { sut, checkChatByIdSpy } = makeSut()
    const request = mockRequest()
    const checkByIdSpy = jest.spyOn(checkChatByIdSpy,'checkById')
    await sut.handle(request)
    expect(checkByIdSpy).toHaveBeenCalledWith(request.accountId,request.id)
  })

  test('Should call updateChatByIdSpy with correct value', async () => {
    const { sut, updateChatByIdSpy } = makeSut()
    const request = mockRequest()
    const updateByIdSpy = jest.spyOn(updateChatByIdSpy,'updateById')
    await sut.handle(request)
    expect(updateByIdSpy).toHaveBeenCalledWith(request.accountId,request.id, request)
  })

  test('Should return 200 on success', async () => {
    const { sut, updateChatByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(updateChatByIdSpy.result))
  })

  test('Should return 404 when chat does not exist', async () => {
    const { sut, checkChatByIdSpy } = makeSut()
    jest.spyOn(checkChatByIdSpy, 'checkById').mockResolvedValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should return 500 if checkChatById throws', async () => {
    const { sut, checkChatByIdSpy } = makeSut()
    jest.spyOn(checkChatByIdSpy, 'checkById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 500 if updateChatById throws', async () => {
    const { sut, updateChatByIdSpy } = makeSut()
    jest.spyOn(updateChatByIdSpy, 'updateById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
