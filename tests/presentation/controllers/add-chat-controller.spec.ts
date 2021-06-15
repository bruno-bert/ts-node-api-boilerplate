import { AddChatController } from '@/presentation/controllers'
import { badRequest, serverError, ok } from '@/presentation/helpers'
import { ValidationSpy, AddChatSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'
 import { Step, StepType } from '@/domain/models'

 const mockValidStep = (type: StepType = 'text'): Step => (
  {
    stepId: faker.datatype.uuid(),
    type,
    message: faker.random.words()
  }
)


const mockRequest = (): AddChatController.Request => ({
  welcomeMessage: faker.random.words(),
  name: faker.random.words(),
  accountId: faker.random.words()
})

type SutTypes = {
  sut: AddChatController
  validationSpy: ValidationSpy
  addChatSpy: AddChatSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addChatSpy = new AddChatSpy()
  const sut = new AddChatController(validationSpy, addChatSpy)
  return {
    sut,
    validationSpy,
    addChatSpy
  }
}

describe('AddChat Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call AddChat with correct values', async () => {
    const { sut, addChatSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addChatSpy.params).toEqual({ ...request, date: new Date() })
  })

  test('Should return 500 if AddChat throws', async () => {
    const { sut, addChatSpy } = makeSut()
    jest.spyOn(addChatSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut,addChatSpy } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(addChatSpy.result))
  })

  test('Should return 200 on success with Step', async () => {
    const { sut,addChatSpy } = makeSut()
    const request = { ...mockRequest(), steps: [mockValidStep()]}
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(addChatSpy.result))
  })

})
