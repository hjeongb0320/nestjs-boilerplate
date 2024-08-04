import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class UpdateUserRequestDto {
  @ApiProperty({ example: '1' })
  userId: number

  @ApiProperty({ example: 'Hee' })
  @IsString()
  username: string
}
