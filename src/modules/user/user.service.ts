import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm'
import { CreateUserResponseDto } from './dto/createUser.response.dto'
import { DeleteUserResponseDto } from './dto/deleteUser.response.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(username: string): Promise<CreateUserResponseDto> {
    try {
      const result: UserEntity = await this.userRepository.save({
        username,
      })
      return new CreateUserResponseDto(result.id, result.username)
    } catch (QueryFailedError) {
      if (QueryFailedError.code === '23505') {
        throw new ConflictException('Fail: Username already exists')
      } else throw new InternalServerErrorException('Fail: unexpected DB internal error')
    }
  }

  async deleteUser(username: string): Promise<DeleteUserResponseDto> {
    try {
      const user: UserEntity = await this.userRepository.findOne({
        where: { username },
      })
      const result = await this.userRepository.remove(user)
      return new DeleteUserResponseDto(result.username)
    } catch (MustBeEntityError) {
      throw new NotFoundException('Fail: Username does not exist')
    }
  }
}
