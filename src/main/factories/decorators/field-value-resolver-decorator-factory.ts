import { LodashFieldValueResolver } from '@/infra/helpers'
import { FieldValueResolverDecorator } from '@/main/decorators'
import { Validation } from '@/presentation/protocols'

export const makeFieldValueResolver = (pathToResolve: string): any => {
  return new LodashFieldValueResolver(pathToResolve)
}

export const makeFieldValueResolverDecorator = (validator: Validation, pathToResolve: string): Validation => {
  const fieldValueResolver = makeFieldValueResolver(pathToResolve)
  return new FieldValueResolverDecorator(validator, fieldValueResolver)
}
