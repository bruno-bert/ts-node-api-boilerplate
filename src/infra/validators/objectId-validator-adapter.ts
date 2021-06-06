/* eslint-disable @typescript-eslint/no-base-to-string */
import { ObjectIdValidator } from '@/validation/protocols'

import { ObjectId } from 'mongodb'

export class ObjectIdValidatorAdapter implements ObjectIdValidator {
  isValid (objectId: string): boolean {
    let result
    try {
      result = new ObjectId(objectId).toString() === objectId
    } catch (error) {
      return false
    }

    return result
  }
}
