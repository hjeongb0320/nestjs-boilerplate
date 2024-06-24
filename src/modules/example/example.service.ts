import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExampleEntity } from './entities/example.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExampleResponseDto } from './dto/createExample.response.dto';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(ExampleEntity)
    private readonly exampleRepository: Repository<ExampleEntity>,
  ) {}

  async create_example(description: string): Promise<CreateExampleResponseDto> {
    const result: ExampleEntity = await this.exampleRepository.save({
      description,
    });
    return new CreateExampleResponseDto(result.id, result.description);
  }
}
