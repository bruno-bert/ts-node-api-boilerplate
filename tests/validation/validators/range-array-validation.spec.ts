import { RangeArrayValidation } from '@/validation/validators'
import { RangeArrayError } from '@/presentation/errors'

const makeSut = (min: number, max: number): RangeArrayValidation => {
  return new RangeArrayValidation('arrayField', min, max)
}

describe('RangeArray Validation', () => {
  test('Should return a RangeArrayError if validation fails', () => {
    const sut = makeSut(1,1)
    const obj = { arrayField: [] }
    const error = sut.validate(obj)
    expect(error).toEqual(new RangeArrayError('arrayField',1, 1))
  })

  test('Should return a Error if min greater tha max param', () => {
    const sut = makeSut(1,0)
    const obj = { arrayField: [] }
    const error = sut.validate(obj)
    expect(error).toEqual(new Error('RangeArrayError - Max Param must be greater then Min Param'))
  })

  test('Should not return if validation succeeds - one item', () => {
    const sut = makeSut(1,1)
    const obj = { arrayField: [{}] }
    const error = sut.validate(obj)
    expect(error).toBeFalsy()
  })

  test('Should not return if validation succeeds - null', () => {
    const sut = makeSut(1,1)
    const obj = { arrayField: null }
    const error = sut.validate(obj)
    expect(error).toEqual(new RangeArrayError('arrayField',1, 1))
  })

  test('Should not return if validation succeeds - min 0 max 1', () => {
    const sut = makeSut(0,1)
    const obj = { arrayField: null }
    const error = sut.validate(obj)
    expect(error).toBeFalsy()
  })

  test('Should not return if validation succeeds - range of items (2)', () => {
    const sut = makeSut(1,3)
    const obj = { arrayField: [{}, {}] }
    const error = sut.validate(obj)
    expect(error).toBeFalsy()
  })

  test('Should not return if validation succeeds - range of items (3)', () => {
    const sut = makeSut(1,3)
    const obj = { arrayField: [{}, {}, {}] }
    const error = sut.validate(obj)
    expect(error).toBeFalsy()
  })

  test('Should not return if validation succeeds - range of items (4)', () => {
    const sut = makeSut(2,3)
    const obj = { arrayField: [{}, {}, {}] }
    const error = sut.validate(obj)
    expect(error).toBeFalsy()
  })
})
