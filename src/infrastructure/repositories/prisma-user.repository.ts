import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../core/domain/repositories/user.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserEntity } from '../../core/domain/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? new UserEntity(user.id, user.email, user.password) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? new UserEntity(user.id, user.email, user.password) : null;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const newUser = await this.prisma.user.create({
      data: {
      email: user.email,
        password: user.password,
    },
    });
    return new UserEntity(newUser.id, newUser.email, newUser.password)
  }

  async update(id: number, user: UserEntity): Promise<UserEntity> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { email: user.email, password: user.password },
    })
    return new UserEntity(updatedUser.id, updatedUser.email, updatedUser.password)
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}