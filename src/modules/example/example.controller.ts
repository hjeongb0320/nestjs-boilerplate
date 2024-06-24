import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiResponseFormat,
  apiResponse,
} from 'src/common/response/api.response';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExampleService } from './example.service';
import { CreateExampleResponseDto } from './dto/createExample.response.dto';
import { CreateExampleRequestDto } from './dto/createExample.request.dto';

@ApiTags('example')
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post('')
  @ApiOperation({ summary: 'Create example' })
  @ApiResponse({
    status: 200,
    description: 'The example has been successfully created.',
    type: CreateExampleResponseDto,
  })
  async create_example(
    @Body() createExampleRequestDto: CreateExampleRequestDto,
  ): Promise<ApiResponseFormat<CreateExampleResponseDto>> {
    const data: CreateExampleResponseDto =
      await this.exampleService.create_example(
        createExampleRequestDto.description,
      );
    return apiResponse<CreateExampleResponseDto>({
      statusCode: 200,
      message: 'success',
      data,
    });
  }
}
