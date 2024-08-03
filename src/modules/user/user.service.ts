import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm'
import { DeleteUserResponseDto } from './dto/deleteUser.response.dto'
import { UserResponseDto } from './dto/user.response.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUser(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id: userId },
    })
  }

  async findAllUser(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  async createUser(username: string, password: string): Promise<UserResponseDto> {
    try {
      const newUser: UserEntity = await UserEntity.createUser(username, password)
      const result: UserEntity = await this.userRepository.save(newUser)
      return new UserResponseDto(result.id, result.username, result.password)
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Fail: Username already exists')
      } else if (error.code === '1000' || error.code === '1001') {
        throw new NotAcceptableException(error.message)
      } else {
        throw new InternalServerErrorException('Unexpected Server Error')
      }
    }
  }

  async getUser(userId: number): Promise<UserResponseDto> {
    try {
      const result: UserEntity = await this.findUser(userId)
      return new UserResponseDto(result.id, result.username, result.password)
    } catch (MustBeEntityError) {
      throw new NotFoundException('Fail: User does not exist')
    }
  }

  async getAllUser(): Promise<UserResponseDto[]> {
    const result: UserEntity[] = await this.findAllUser()
    return result.map(user => new UserResponseDto(user.id, user.username, user.password))
  }

  async updateUser(userId: number, username: string): Promise<UserResponseDto> {
    try {
      const user: UserEntity = await this.findUser(userId)
      user.username = username
      const result = await this.userRepository.save(user)
      return new UserResponseDto(result.id, result.username, result.password)
    } catch (MustBeEntityError) {
      throw new NotFoundException('Fail: Username does not exist')
    }
  }

  async deleteUser(userId: number): Promise<DeleteUserResponseDto> {
    try {
      const user: UserEntity = await this.findUser(userId)
      const result = await this.userRepository.remove(user)
      return new DeleteUserResponseDto(result.username)
    } catch (MustBeEntityError) {
      throw new NotFoundException('Fail: Username does not exist')
    }
  }

  async deleteAllUser(): Promise<void> {
    await this.userRepository.clear()
  }
}
