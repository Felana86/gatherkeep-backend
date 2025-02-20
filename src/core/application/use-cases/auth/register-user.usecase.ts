import { UserRepository } from '../../../domain/repositories/user.repository';
import { CreateUserDto } from '../../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../../domain/entities/user.entity';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<UserEntity | null> {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new Error("Les mots depasse ne sont pas identiques");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new UserEntity(0, createUserDto.email, createUserDto.password, hashedPassword);

    return await this.userRepository.findByEmail(user);
  }
}