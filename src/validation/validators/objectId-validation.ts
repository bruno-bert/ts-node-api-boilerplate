import { ObjectIdValidator } from '@/validation/protocols'
import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class ObjectIdValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly objectIdValidator: ObjectIdValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.objectIdValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
