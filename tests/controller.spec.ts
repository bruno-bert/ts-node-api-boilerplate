import { User } from '@/domain/user'
describe('Controller', () => {
  test('should test jest', () => {
    const user = new User()
    expect(user).toEqual(user)
  })
})
