export interface ApiExceptionFormat {
  message: number
  error: string
  statusCode: number
}

export function apiException(response: ApiExceptionFormat) {
  return {
    message: response.message,
    error: response.error,
    statusCode: response.statusCode,
  }
}
