import { ValidationComposite, RequiredFieldValidation, ObjectIdValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { ObjectIdValidatorAdapter } from '@/infra/validators'

const requiredFields = ['welcomeMessage', 'name']

export const makeUpdateChatValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ObjectIdValidation('id', new ObjectIdValidatorAdapter()))

  return new ValidationComposite(validations)
}
