import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepositoryDomain } from '../../../domain/repositories/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { PrismaService } from '../../config/prisma.service';

@Injectable()
export class UserRepositoryPrisma implements UserRepositoryDomain {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.toUserEntity(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email}});
    return user ? this.toUserEntity(user) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const users = await this.prisma.user.findMany();
      return users.map(this.toUserEntity)
    } catch (error) {
      throw new BadRequestException('Failed to findAll users');
    }
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    })
    return this.toUserEntity(createdUser)
  }

  async update(id: number, updates: Partial<UserEntity>): Promise<UserEntity> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updates,
    })
    return this.toUserEntity(updatedUser)
  }

  async save(id: number, updates: Partial<UserEntity>): Promise<UserEntity> {
    return this.update(id, updates)
  }

  async delete(id: number): Promise<string> {
    try {
      await this.prisma.user.delete({ where: { id }});
      return `User with ID ${id} was deleted successfully.`;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateRefreshToken(id: number, refreshToken: string, expiresAt: Date): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken, refreshTokenExpiresAt: expiresAt }
    })
  }

  private toUserEntity(prismaUser: any): UserEntity {
    return {
      id: prismaUser.id,
        email: prismaUser.email,
        password: prismaUser.password,
        firstName: prismaUser.firstName,
        lastName: prismaUser.lastName,
        role: prismaUser.role,
        refreshToken: prismaUser.refreshToken,
        refreshTokenExpiresAt: prismaUser.refreshTokenExpiresAt,
    };
  }

}