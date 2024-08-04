import { ApiProperty } from '@nestjs/swagger'

export class LoginRequestDto {
  @ApiProperty({ example: 'Hee' })
  username: string

  @ApiProperty({ example: 'Supersecret1!' })
  password: string
}
