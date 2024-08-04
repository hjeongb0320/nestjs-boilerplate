import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginRequestDto } from './dto/login.request.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LocalAuthGuard } from 'src/modules/auth/guards/local-auth.guard'
import { LoginResponseDto } from './dto/login.response.dto'
import { ErrorResponse } from 'src/common/response/error.response'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'Return access token',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Fail: unauthorized',
    type: ErrorResponse,
  })
  async login(@Request() req, @Body() loginRequestDto: LoginRequestDto) {
    return this.authService.login(req.user)
  }
}
