import { ApiProperty } from '@nestjs/swagger'

export class ErrorResponse {
  @ApiProperty({ example: 'Error message' })
  message: number

  @ApiProperty({ example: 'Error type' })
  error: string

  @ApiProperty({ example: '400' })
  statusCode: number
}
