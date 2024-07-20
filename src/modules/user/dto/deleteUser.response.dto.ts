import { ApiProperty } from '@nestjs/swagger'

export class DeleteUserResponseDto {
  @ApiProperty({ example: 'Hee', description: 'user name' })
  username: string

  constructor(username: string) {
    this.username = username
  }
}
