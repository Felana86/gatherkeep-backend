import { Injectable } from '@nestjs/common';
import { UserRepository } from '../core/domain/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

}