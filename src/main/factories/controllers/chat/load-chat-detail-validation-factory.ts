import { ValidationComposite, RequiredFieldValidation, ObjectIdValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { ObjectIdValidatorAdapter } from '@/infra/validators'

export const makeLoadChatDetailValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ObjectIdValidation('id', new ObjectIdValidatorAdapter()))

  return new ValidationComposite(validations)
}
