import { objectWithoutProperty } from '@/presentation/helpers'

describe('Generic Helper', () => {
  test('Should remove fields from object', () => {
    const test = { field1: 'value',field2: 'value',field3: 'value' }
    const result = objectWithoutProperty(test,['field1', 'field2'])
    expect(result.field1).toBeFalsy()
    expect(result.field2).toBeFalsy()
    expect(result.field3).toBeTruthy()
  })
})
