import { ApiProperty } from '@nestjs/swagger';

export class CreateExampleRequestDto {
  @ApiProperty({ example: 'description' })
  description: string;
}
