import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common'
import { UserEntity } from './entities/user.entity'
import { DeleteUserResponseDto } from './dto/response/deleteUser.response.dto'
import { UserResponseDto } from './dto/response/user.response.dto'
import { UserRepository } from './repositories/\buser.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(username: string, password: string): Promise<UserResponseDto> {
    try {
      const result: UserEntity = await this.userRepository.createUser(username, password)
      return new UserResponseDto(result.id, result.username, result.password)
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Fail: Username already exists')
      } else if (error.code === '1000' || error.code === '1001') {
        throw new NotAcceptableException(error.message)
      }
    }
  }

  async getUser(userId: number): Promise<UserResponseDto> {
    try {
      const result: UserEntity = await this.userRepository.findUser(userId)
      return new UserResponseDto(result.id, result.username, result.password)
    } catch (MustBeEntityError) {
      throw new NotFoundException('Fail: User does not exist')
    }
  }

  async getAllUser(): Promise<UserResponseDto[]> {
    const result: UserEntity[] = await this.userRepository.findAllUser()
    return result.map(user => new UserResponseDto(user.id, user.username, user.password))
  }

  async updateUser(userId: number, username: string): Promise<UserResponseDto> {
    try {
      const result = await this.userRepository.updateUser(userId, username, null)
      return new UserResponseDto(result.id, result.username, result.password)
    } catch (MustBeEntityError) {
      throw new NotFoundException('Fail: Username does not exist')
    }
  }

  async deleteUser(userId: number): Promise<DeleteUserResponseDto> {
    try {
      const result = await this.userRepository.deleteUser(userId)
      return new DeleteUserResponseDto(result.username)
    } catch (MustBeEntityError) {
      throw new NotFoundException('Fail: Username does not exist')
    }
  }

  async deleteAllUser(): Promise<void> {
    await this.userRepository.deleteAllUser()
  }
}
