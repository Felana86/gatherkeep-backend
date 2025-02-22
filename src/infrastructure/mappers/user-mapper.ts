import { Prisma, PrismaClient } from '@prisma/client';
import { UserEntity } from '../../domain/entities/user.entity';

function toUserEntity(userModel: Prisma.User): UserEntity {
  return new UserEntity(
      userModel.id,
      userModel.email,
      userModel.password,
      userModel.firstName,
      userModel.lastName,
      userModel.role,
      userModel.refreshToken,
      userModel.refreshTokenExpiresAt,
    );
}

function toUserPersistence(userEntity: UserEntity):  {
  return {
      id: userEntity.id,
      email: userEntity.email,
      password: userEntity.password,
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      role: userEntity.role,
      refreshToken: userEntity.refreshToken,
      refreshTokenExpiresAt: userEntity.refreshTokenExpiresAt,
  };
}