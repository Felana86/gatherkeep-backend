import { Injectable } from '@nestjs/common';
import { UserRepositoryDomain } from '../../../domain/repositoriesDomain/user.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import { UserEntity } from '../../../domain/entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepositoryDomain {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email}});
      return user ? new UserEntity(user.id, user.email, user.password, user.role) : null;
    } catch (error) {
      throw new Error(`Error occurred while finding user with email: ${email}`);
    }
  }

  async  findById(id:number): Promise<UserEntity | null> {
    try {
      const user = await this.prisma.user.findUnique({  where: { id } });
      return user ? new UserEntity(user.id, user.email, user.password) : null;
    } catch (error) {
      throw new Error(`Error occurred while finding: ${id}`);
    }
  }

  async  findAll(): Promise<UserEntity[]> {
    try {
      const users = await this.prisma.user.findMany()
      return users.map(user => new UserEntity(
        user.id,
        user.email,
        user.password,
        user.role))
    } catch (error) {
      throw new Error(`Error occurred while findAll()`);
    }
  }

  async create(user: UserEntity): Promise<UserEntity> {
    try {
      const createdUser = await this.prisma.user.create({ data: user });
      return new UserEntity(createdUser.id, createdUser.email, createdUser.password);
    } catch (error) {
      throw new Error('Error occurred while creating user');
    }
  }

  async  update(id: number, updates: Partial<UserEntity>): Promise<UserEntity> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updates
      })
      return new UserEntity(
        updatedUser.id,
        updatedUser.email,
        updatedUser.password,
        updatedUser.role
      )
    } catch (error) {
      throw new Error(`Error occurred while updating user: ${error.message}`)
    }
  }

  async delete(id: number): Promise<string> {
    await this.prisma.user.delete({ where: { id }})
    return ('The user has been deleted successfully.');
  }

  async updateRefreshToken(id: number, refreshToken: string, expiresAt: Date): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken, refreshTokenExpiresAt: expiresAt}
    })
  }
}