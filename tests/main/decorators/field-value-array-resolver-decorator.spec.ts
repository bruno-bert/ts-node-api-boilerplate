import { FieldValueArrayResolverDecorator } from '@/main/decorators'
import { Validation } from '@/presentation/protocols'

import { FieldValueResolver } from '@/validation/protocols'

class ValidatorSpy implements Validation {
  result: any
  validate (input: any): any {
    return this.result
  }
}

class FieldValueResolverSpy implements FieldValueResolver {
  pathToResolve: string = ''

  resolve (obj: object): any {
    return null
  }
}

type SutTypes = {
  sut: FieldValueArrayResolverDecorator
  fieldValueResolverSpy: FieldValueResolverSpy
  validatorSpy: ValidatorSpy
}

const makeSut = (): SutTypes => {
  const validatorSpy = new ValidatorSpy()
  const fieldValueResolverSpy = new FieldValueResolverSpy()

  const sut = new FieldValueArrayResolverDecorator(validatorSpy, fieldValueResolverSpy)
  return {
    sut,
    validatorSpy,
    fieldValueResolverSpy
  }
}

const mockInput = (): any => {
  return {
    test: {
      test2: [
        {
          testA: 1,
          testB: [{ testC: 'a' }, { testC: 'b' }, { testC: 'c' }]
        },
        { testA: 2 },
        { testA: 3 },
        { testA: 4 }
      ]
    }
  }
}

describe('FieldValueArrayResolver Decorator', () => {
  test('Should call fieldValueResolver resolve method with correct values', async () => {
    const { sut, validatorSpy, fieldValueResolverSpy } = makeSut()
    fieldValueResolverSpy.pathToResolve = 'test.test2.testB.testC'
    const validateSpy = jest.spyOn(validatorSpy, 'validate').mockImplementation(() => {
      return new Error('test')
    })
    sut.validate(mockInput())
    expect(validateSpy).toHaveReturnedWith(new Error('test'))
  })
})
