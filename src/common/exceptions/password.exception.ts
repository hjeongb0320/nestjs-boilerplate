export class PasswordValidationError extends Error {
  code: string

  constructor(message: string, code: string) {
    super(message)
    this.name = 'PasswordValidationError'
    this.code = code
  }
}
