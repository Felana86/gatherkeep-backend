import { UserRepositoryDomain } from '../../domain/repositoriesDomain/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDto } from '../dtos/user.dto';

export class AuthService {
  constructor(
    private readonly userRepository: UserRepositoryDomain,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  async register(createdUserDto: CreateUserDto): Promise<UserDto> {
    const existingUser = await this.userRepository.findByEmail(createdUserDto.email);
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await this.hashService.hash(createdUserDto.password);
    const user = await this.userRepository.create({
      ...createdUserDto,
      password: hashedPassword
    })
    return new UserDto(user.id, user.email, user.lastName, user.firstName, user.role, user.)
  }

}