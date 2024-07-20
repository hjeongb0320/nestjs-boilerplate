import { ApiProperty } from '@nestjs/swagger'

export class CreateUserResponseDto {
  @ApiProperty({ example: 1, description: 'primary key' })
  id: number

  @ApiProperty({ example: 'Hee', description: 'user name' })
  username: string

  constructor(id: number, username: string) {
    this.id = id
    this.username = username
  }
}
