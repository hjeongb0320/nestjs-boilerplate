import { Body, Controller, Delete, Post, Get, Query, Patch } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { apiResponse, ApiResponseFormat } from 'src/common/response/api.response'
import { UserResponseDto } from './dto/response/user.response.dto'
import { CreateUserRequestDto } from './dto/request/createUser.request.dto'
import { ErrorResponse } from 'src/common/response/error.response'
import { DeleteUserResponseDto } from './dto/response/deleteUser.response.dto'
import { DeleteUserRequestDto } from './dto/request/deleteUser.request.dto'
import { UpdateUserRequestDto } from './dto/request/updateUser.request.dto'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 200,
    description: '[User] has been successfully created.',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Fail: Username already exists',
    type: ErrorResponse,
  })
  async createUser(@Body() createUserRequestDto: CreateUserRequestDto): Promise<ApiResponseFormat<UserResponseDto>> {
    const data: UserResponseDto = await this.userService.createUser(
      createUserRequestDto.username,
      createUserRequestDto.password,
    )
    return apiResponse<UserResponseDto>({
      statusCode: 200,
      message: 'success',
      data,
    })
  }

  @Get('')
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({
    status: 200,
    description: 'Return [User]',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Fail: Username does not exist',
    type: ErrorResponse,
  })
  async getUser(@Query('id') userId: number): Promise<ApiResponseFormat<UserResponseDto>> {
    const data: UserResponseDto = await this.userService.getUser(userId)
    return apiResponse<UserResponseDto>({
      statusCode: 200,
      message: 'success',
      data,
    })
  }

  @Get('/all')
  @ApiOperation({ summary: 'Get all user' })
  @ApiResponse({
    status: 200,
    description: 'All [User] list.',
    type: [UserResponseDto],
  })
  async getAllUser(): Promise<ApiResponseFormat<UserResponseDto[]>> {
    const data: UserResponseDto[] = await this.userService.getAllUser()
    return apiResponse<UserResponseDto[]>({
      statusCode: 200,
      message: 'success',
      data,
    })
  }

  @Patch('')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: '[User] has been successfully updated',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Fail: User does not exist',
    type: ErrorResponse,
  })
  async updateUser(@Body() updateUserRequestDto: UpdateUserRequestDto): Promise<ApiResponseFormat<UserResponseDto>> {
    const data: UserResponseDto = await this.userService.updateUser(
      updateUserRequestDto.userId,
      updateUserRequestDto.username,
    )
    return apiResponse<UserResponseDto>({
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
    const data: DeleteUserResponseDto = await this.userService.deleteUser(deleteUserRequestDto.userId)
    return apiResponse<DeleteUserResponseDto>({
      statusCode: 200,
      message: 'success',
      data,
    })
  }

  @Delete('/all')
  @ApiOperation({ summary: 'Delete all user' })
  @ApiResponse({
    status: 200,
    description: 'All [User] has been successfully deleted',
    type: null,
  })
  async deleteAllUser(): Promise<ApiResponseFormat<null>> {
    await this.userService.deleteAllUser()
    return apiResponse<null>({
      statusCode: 200,
      message: 'All user has been successfully deleted',
      data: null,
    })
  }
}
