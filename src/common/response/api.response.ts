export interface ApiResponseFormat<T> {
  statusCode: number;
  message: string;
  data: T;
}

export function apiResponse<T>(response: ApiResponseFormat<T>) {
  return {
    statusCode: response.statusCode,
    message: response.message,
    data: response.data,
  };
}
