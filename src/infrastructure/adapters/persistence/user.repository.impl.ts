import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}


}