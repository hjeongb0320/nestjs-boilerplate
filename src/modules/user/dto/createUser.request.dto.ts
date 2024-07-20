import { ApiProperty } from '@nestjs/swagger'

export class CreateUserRequestDto {
  @ApiProperty({ example: 'Hee' })
  username: string
}
