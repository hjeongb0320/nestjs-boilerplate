import { ApiProperty } from '@nestjs/swagger'

export class DeleteUserRequestDto {
  @ApiProperty({ example: 'Hee' })
  username: string
}
