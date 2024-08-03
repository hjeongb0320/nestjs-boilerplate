export interface ApiResponseFormat<T> {
  statusCode: number
  message: string
  data: T | null
}

export function apiResponse<T>(response: ApiResponseFormat<T>) {
  return {
    statusCode: response.statusCode,
    message: response.message,
    data: response.data,
  }
}
