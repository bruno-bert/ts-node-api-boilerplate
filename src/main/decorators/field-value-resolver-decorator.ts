import { Validation } from '@/presentation/protocols'
import { FieldValueResolver } from '@/validation/protocols/field-value-resolver'

export class FieldValueResolverDecorator implements Validation {
  constructor (
    private readonly validator: Validation,
    private readonly fieldValueResolver: FieldValueResolver
  ) {}

  validate (input: any): Error {
    const resolvedInput = this.fieldValueResolver.resolve(input)
    return this.validator.validate(resolvedInput)
  }
}
