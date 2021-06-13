import { makeAddChatValidation , makeFieldValueArrayResolverDecorator } from '@/main/factories'
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

    for (const field of ['steps.message']) {
      validations.push(makeFieldValueArrayResolverDecorator(new RequiredFieldValidation(field),field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
