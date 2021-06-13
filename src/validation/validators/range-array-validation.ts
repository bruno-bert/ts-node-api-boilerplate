import { Validation } from '@/presentation/protocols'
import { RangeArrayError } from '@/presentation/errors'

export class RangeArrayValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly min: number, private readonly max: number) {}

  validate (input: any): Error {
    if (this.min > this.max) { return new Error('RangeArrayError - Max Param must be greater then Min Param') }

    if (this.min > 0) {
      if (!input[this.fieldName]) { return new RangeArrayError(this.fieldName, this.min, this.max) }
    }

    if (input[this.fieldName]) {
      const length = (input[this.fieldName] as []).length
      if (length < this.min || length > this.max) { return new RangeArrayError(this.fieldName, this.min, this.max) }
    }
  }
}
