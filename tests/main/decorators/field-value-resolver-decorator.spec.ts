import { FieldValueResolverDecorator } from '@/main/decorators'
import { Validation } from '@/presentation/protocols'

import faker from 'faker'
import { FieldValueResolver } from '@/validation/protocols'
import { throwError } from '@/tests/domain/mocks'

class ValidatorSpy implements Validation {
  result: any
  validate (input: any): any {
    return this.result
  }
}

class FieldValueResolverSpy implements FieldValueResolver {
  pathToResolve: string
  resolve (obj: object): any {
    return null
  }
}

type SutTypes = {
  sut: FieldValueResolverDecorator
  fieldValueResolverSpy: FieldValueResolverSpy
  validatorSpy: ValidatorSpy
}
const mockInput = (): any => {
  return faker.random.objectElement()
}

const makeSut = (): SutTypes => {
  const validatorSpy = new ValidatorSpy()
  const fieldValueResolverSpy = new FieldValueResolverSpy()

  const sut = new FieldValueResolverDecorator(validatorSpy, fieldValueResolverSpy)
  return {
    sut,
    validatorSpy,
    fieldValueResolverSpy
  }
}

describe('FieldValueResolver Decorator', () => {
  test('Should call validate method from validator', async () => {
    const { sut, validatorSpy } = makeSut()
    const validateSpy = jest.spyOn(validatorSpy,'validate')
    sut.validate(mockInput())
    expect(validateSpy).toBeCalled()
  })

  test('Should return the same result of the validator', async () => {
    const { sut, validatorSpy } = makeSut()
    validatorSpy.result = faker.lorem.word()
    const result = sut.validate(mockInput())
    expect(result).toEqual(validatorSpy.result)
  })

  test('Should throw error if validator throws', async () => {
    const { sut, validatorSpy } = makeSut()
    jest.spyOn(validatorSpy,'validate').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })

  test('Should call fieldValueResolver resolve method', async () => {
    const { sut, fieldValueResolverSpy } = makeSut()
    const resolveSpy = jest.spyOn(fieldValueResolverSpy,'resolve')
    sut.validate(mockInput())
    expect(resolveSpy).toBeCalled()
  })

  test('Should throw error if fieldValueResolver throws', async () => {
    const { sut, fieldValueResolverSpy } = makeSut()
    jest.spyOn(fieldValueResolverSpy,'resolve').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})
