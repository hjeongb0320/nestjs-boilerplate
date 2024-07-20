import { Body, Controller, Delete, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { apiResponse, ApiResponseFormat } from 'src/common/response/api.response'
import { CreateUserResponseDto } from './dto/createUser.response.dto'
import { CreateUserRequestDto } from './dto/createUser.request.dto'
import { ErrorResponse } from 'src/common/response/error.response'
import { DeleteUserResponseDto } from './dto/deleteUser.response.dto'
import { DeleteUserRequestDto } from './dto/deleteUser.request.dto'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly exampleService: UserService) {}

  @Post('')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 200,
    description: '[User] has been successfully created.',
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Fail: Username already exists',
    type: ErrorResponse,
  })
  async createUser(
    @Body() createUserRequestDto: CreateUserRequestDto,
  ): Promise<ApiResponseFormat<CreateUserResponseDto>> {
    const data: CreateUserResponseDto = await this.exampleService.createUser(createUserRequestDto.username)
    return apiResponse<CreateUserResponseDto>({
      statusCode: 200,
      message: 'success',
      data,
    })
  }

  @Delete('')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    description: '[User] has been successfully deleted',
    type: DeleteUserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Fail: Username does not exist',
    type: ErrorResponse,
  })
  async deleteUser(
    @Body() deleteUserRequestDto: DeleteUserRequestDto,
  ): Promise<ApiResponseFormat<DeleteUserResponseDto>> {
    const data: DeleteUserResponseDto = await this.exampleService.deleteUser(deleteUserRequestDto.username)
    return apiResponse<DeleteUserResponseDto>({
      statusCode: 200,
      message: 'success',
      data,
    })
  }
}
