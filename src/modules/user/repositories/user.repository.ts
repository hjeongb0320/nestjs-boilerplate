import { ConflictException, Injectable, NotAcceptableException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { UserEntity } from '../entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(username: string, password: string): Promise<UserEntity> {
    try {
      const newUser = new UserEntity(username, password)
      await newUser.setPassword(password)
      const result: UserEntity = await this.userRepository.save(newUser)
      return result
    } catch (error) {
      throw error
    }
  }

  async findUser(userId: number): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({
        where: { id: userId },
      })
    } catch (error) {
      throw error
    }
  }

  async findAllUser(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  async updateUser(userId: number, username: string | null, password: string | null): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.findUser(userId)
      user.username = username ? username : user.username
      if (password) {
        await user.setPassword(password)
      }
      const result = await this.userRepository.save(user)
      return result
    } catch (error) {
      throw error
    }
  }

  async deleteUser(userId: number): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.findUser(userId)
      const result = await this.userRepository.remove(user)
      return result
    } catch (error) {
      throw error
    }
  }

  async deleteAllUser(): Promise<void> {
    await this.userRepository.clear()
  }
}
