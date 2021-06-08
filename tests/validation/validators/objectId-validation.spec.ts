import { ObjectIdValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { ObjectIdValidatorSpy } from '@/tests/validation/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

const field = faker.random.word()

type SutTypes = {
  sut: ObjectIdValidation
  objectIdValidatorSpy: ObjectIdValidatorSpy
}

const makeSut = (): SutTypes => {
  const objectIdValidatorSpy = new ObjectIdValidatorSpy()
  const sut = new ObjectIdValidation(field, objectIdValidatorSpy)
  return {
    sut,
    objectIdValidatorSpy
  }
}

describe('ObjectId Validation', () => {
  test('Should return an error if ObjectIdValidator returns false', () => {
    const { sut, objectIdValidatorSpy } = makeSut()
    objectIdValidatorSpy.isIdValid = false
    const id = faker.random.word()
    const error = sut.validate({ [field]: id })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should call ObjectIdValidator with correct id', () => {
    const { sut, objectIdValidatorSpy } = makeSut()
    const id = faker.random.word()
    sut.validate({ [field]: id })
    expect(objectIdValidatorSpy.id).toBe(id)
  })

  test('Should throw if ObjectIdValidator throws', () => {
    const { sut, objectIdValidatorSpy } = makeSut()
    jest.spyOn(objectIdValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})
