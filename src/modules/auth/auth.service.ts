import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { UserRepository } from '../user/repositories/\buser.repository'
import { UserEntity } from '../user/entities/user.entity'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository.validateUser(username, password)
      return user
    } catch (error) {
      throw error
    }
  }

  async login(user: any) {
    const payload = { id: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
