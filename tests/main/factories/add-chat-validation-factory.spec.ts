import { makeAddChatValidation } from '@/main/factories'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('AddChatValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddChatValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'welcomeMessage']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
