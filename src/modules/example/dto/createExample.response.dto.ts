import { ApiProperty } from '@nestjs/swagger'

export class CreateExampleResponseDto {
  @ApiProperty({ example: 1, description: 'primary key' })
  id: number

  @ApiProperty({ example: 'this is description', description: 'description' })
  description: string

  constructor(id: number, description: string) {
    this.id = id
    this.description = description
  }
}
