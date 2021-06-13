import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { makeFieldValueArrayResolverDecorator } from '@/main/factories'

export const makeAddChatValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'welcomeMessage']) {
    validations.push(new RequiredFieldValidation(field))
  }

  for (const field of ['steps.message']) {
    validations.push(makeFieldValueArrayResolverDecorator(new RequiredFieldValidation(field),field))
  }

  return new ValidationComposite(validations)
}
