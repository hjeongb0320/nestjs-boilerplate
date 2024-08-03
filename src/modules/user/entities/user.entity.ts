import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, BeforeUpdate } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { PasswordValidationError } from 'src/common/exceptions/password.exception'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  private _password: string

  static async createUser(username: string, password: string): Promise<UserEntity> {
    const newUser = new UserEntity(username, password)
    await newUser.setPassword(password)
    return newUser
  }

  async setPassword(password: string) {
    const passwordLength = password.length
    if (passwordLength < 8 || passwordLength > 20) {
      throw new PasswordValidationError('비밀번호는 최소 8자 이상, 최대 20자 이하이어야 합니다.', '1000')
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]*$/.test(password)) {
      throw new PasswordValidationError('비밀번호는 대문자, 소문자, 숫자, 특수 문자를 포함해야 합니다.', '1001')
    }

    this._password = await bcrypt.hash(password, 10)
  }

  get password(): string {
    return this._password
  }

  constructor(username: string, password: string) {
    this.username = username
    this._password = password
  }
}
