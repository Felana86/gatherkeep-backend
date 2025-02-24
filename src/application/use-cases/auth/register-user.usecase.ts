import { UserRepositoryDomain } from '../../../domain/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../../domain/entities/user.entity';

export class RegisterUserUseCase {
  constructor(private readonly userRepositoryDomain: UserRepositoryDomain) {}

  async execute(dto: CreateUserDto) {
    if (dto.password !== dto.confirmPassword) {
      throw new Error("Les mots depasse ne sont pas identiques");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new UserEntity(0, dto.email, hashedPassword);

    return await this.userRepositoryDomain.create(user);
  }
}