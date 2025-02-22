import { UserEntity } from '../entities/user.entity';

export abstract class UserRepositoryDomain {
  abstract findById(id: number): Promise<UserEntity | null>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract create(user: UserEntity): Promise<UserEntity>;
  abstract update(id: number, updates: Partial<UserEntity>): Promise<UserEntity>;
  abstract delete(id: number): Promise<string>;
  abstract updateRefreshToken(id: number, refreshToken: string, expiresAt: Date): Promise<void>;
}