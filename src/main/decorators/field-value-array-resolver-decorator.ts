import { Validation } from '@/presentation/protocols'
import { FieldValueResolver } from '@/validation/protocols/field-value-resolver'
import { dot } from 'dot-object'

export type ValidationResult = {
  field: string
  error: string
}

export class FieldValueArrayResolverDecorator implements Validation {
  constructor (
    private readonly validator: Validation,
    private readonly fieldValueResolver: FieldValueResolver
  ) {}

  validate (input: any): Error {
    let newInput = null
    let value: any = null
    let validationResult = null
    const validationResults: ValidationResult[] = []
    let message = ''

    const dotted = dot(input)
    const paths: string[] = []
    const path: string = this.fieldValueResolver.pathToResolve
    let noBrackts: string = null

    for (const prop of Object.keys(dotted)) {
      noBrackts = prop.replace(/\[(.*?)\]/g, '') /** replaces numbers inside brackets example: [0], [1] */
      if (noBrackts === path) {
        paths.push(prop)
      }
    }

    for (const thePath of paths) {
      value = dotted[thePath]
      newInput = { [thePath]: value }
      validationResult = this.validator.validate(newInput)

      if (validationResult != null) { validationResults.push({ field: thePath, error: validationResult }) }
    }

    if (validationResults.length > 0) {
      for (const result of validationResults) {
        message = `${message}\n${result.field}:${result.error} `
      }
      return new Error(message)
    } else { return null }
  }
}
