import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'primary key' })
  id: number

  @ApiProperty({ example: 'Hee', description: 'user name' })
  username: string

  @ApiProperty({ example: 'Supersecret1!', description: 'password' })
  password: string

  constructor(id: number, username: string, password: string) {
    this.id = id
    this.username = username
    this.password = password
  }
}
