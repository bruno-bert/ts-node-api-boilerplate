import { LodashFieldValueResolver } from '@/infra/helpers'
import { FieldValueArrayResolverDecorator } from '@/main/decorators'
import { Validation } from '@/presentation/protocols'

const makeFieldValueResolver = (pathToResolve: string): any => {
  return new LodashFieldValueResolver(pathToResolve)
}

export const makeFieldValueArrayResolverDecorator = (validator: Validation, pathToResolve: string): Validation => {
  const fieldValueResolver = makeFieldValueResolver(pathToResolve)
  return new FieldValueArrayResolverDecorator(validator, fieldValueResolver)
}
