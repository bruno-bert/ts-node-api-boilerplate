export interface FieldValueResolver {
  pathToResolve: string
  resolve: (obj: object) => any
}
