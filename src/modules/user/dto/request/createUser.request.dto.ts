import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateUserRequestDto {
  @ApiProperty({ example: 'Hee' })
  @IsString()
  username: string

  @ApiProperty({ example: 'Supersecret1!' })
  @IsString()
  password: string
}
