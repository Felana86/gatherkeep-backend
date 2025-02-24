import { Injectable } from '@nestjs/common';
import { UserRepositoryDomain } from '../../../domain/repositories/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { PrismaService } from '../../config/prisma.service';

@Injectable()
export class UserRepositoryPrisma implements UserRepositoryDomain {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<UserEntity | null> {
    return await this.prisma.user.findUnique({ where: { id } }) as UserEntity | null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.prisma.user.findUnique({ where: { email}}) as UserEntity | null;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany() as UserEntity[];
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return await this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    }) as UserEntity;
  }

  async update(id: number, updates: Partial<UserEntity>): Promise<UserEntity> {
    return await this.prisma.user.update({
      where: { id },
      data: updates,
    }) as UserEntity;
  }

  async delete(id: number): Promise<string> {
    await this.prisma.user.delete({ where: { id }});
    return `User with ID ${id} was deleted successfully.`;
  }

  async updateRefreshToken(id: number, refreshToken: string, expiresAt: Date): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken, refreshTokenExpiresAt: expiresAt }
    })
  }

}