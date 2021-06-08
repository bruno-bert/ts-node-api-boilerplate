export class MongoDbError extends Error {
  constructor (method: string, message: string) {
    super(`MongoDB Error in method: ${method} - message: ${message}`)
    this.name = 'MongoDbError'
  }
}
