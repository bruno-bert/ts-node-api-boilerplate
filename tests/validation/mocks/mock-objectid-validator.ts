import { ObjectIdValidator } from '@/validation/protocols'

export class ObjectIdValidatorSpy implements ObjectIdValidator {
  isIdValid = true
  id: string

  isValid (id: string): boolean {
    this.id = id
    return this.isIdValid
  }
}
