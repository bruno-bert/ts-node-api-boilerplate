import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeAddChatValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'welcomeMessage']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
