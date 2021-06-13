import { FieldValueResolver } from '@/validation/protocols'

import { get } from 'lodash'

export class LodashFieldValueResolver implements FieldValueResolver {
  pathToResolve: string
  constructor (pathToResolve: string) {
    this.pathToResolve = pathToResolve
  }

  resolve (input: any): any {
    const value = get(input, this.pathToResolve)
    const fieldName = this.pathToResolve
    return { [fieldName]: value }
  }
}
