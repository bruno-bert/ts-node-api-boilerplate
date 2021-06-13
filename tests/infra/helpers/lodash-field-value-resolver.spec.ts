import { LodashFieldValueResolver } from '@/infra/helpers'

const makeSut = (path: string = fakerStatic.random.word()): LodashFieldValueResolver => {
  return new LodashFieldValueResolver(path)
}

describe('LodashFieldValueResolver', () => {
  test('Should return from get the correct value - simple object', () => {
    const path = 'test.test'
    const sut = makeSut(path)
    const input = { test: { test: 1 } }
    const result = sut.resolve(input)
    expect(result).toEqual({ 'test.test': 1 })
  })

  test('Should return from get the correct value - array object', () => {
    const path = 'test.tests'
    const sut = makeSut(path)
    const input = { test: { tests: [1,2,3] } }
    const result = sut.resolve(input)
    expect(result).toEqual({ 'test.tests': [1,2,3] })
  })

  test('Should return from get the correct value - more levels', () => {
    const path = 'test1.test2.test3.test4.test5.test6.test7.test8.test9.test10'
    const sut = makeSut(path)
    const input = { test1: { test2: { test3: { test4: { test5: { test6: { test7: { test8: { test9: { test10: 1 } } } } } } } } } }
    const result = sut.resolve(input)
    expect(result).toEqual({ 'test1.test2.test3.test4.test5.test6.test7.test8.test9.test10': 1 })
  })

  test('Should return from get the correct value - values inside array', () => {
    const path = 'test.tests[2]'
    const sut = makeSut(path)
    const input = { test: { tests: [1,2,3] } }
    const result = sut.resolve(input)
    expect(result).toEqual({ 'test.tests[2]': 3 })
  })

  test('Should return from get the correct value - all values in array', () => {
    'test.tests[].name'
    'test.tests[0].name'
    'test.tests[1].name'
    'test.tests[2].name'

    const path = 'test.tests[0].inside'
    const sut = makeSut(path)
    const input = { test: { tests: [{ inside: 1 }] } }
    const result = sut.resolve(input)
    console.log(result)
    expect(result).toEqual({ 'test.tests[0].inside': 1 })
  })
})
