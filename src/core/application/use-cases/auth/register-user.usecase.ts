import { UserRepository } from '../../../domain/repositories/user.repository';
import { CreateUserDto } from '../../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../../domain/entities/user.entity';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async register(dto: CreateUserDto): Promise<UserEntity | null> {
    if (dto.password !== dto.confirmPassword) {
      throw new Error("Les mots depasse ne sont pas identiques");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new UserEntity(0, dto.email, hashedPassword);

    return await this.userRepository.create(user);
  }
}