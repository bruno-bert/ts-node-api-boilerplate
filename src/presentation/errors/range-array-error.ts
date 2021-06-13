export class RangeArrayError extends Error {
  constructor (paramName: string, min: number, max: number) {
    let message: string = `Invalid number of items in array: ${paramName}`
    if (min === max) {
      message = message.concat(`Mut have: ${String(min)}`)
    } else {
      message = message.concat(`Min items: ${String(min)}`)
      message = message.concat(`Max iems: ${String(max)}`)
    }
    super(message)
    this.name = 'RangeArrayError'
  }
}
