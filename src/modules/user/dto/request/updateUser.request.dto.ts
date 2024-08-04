import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class UpdateUserRequestDto {
  @ApiProperty({ example: 'Hee' })
  @IsString()
  username: string
}
