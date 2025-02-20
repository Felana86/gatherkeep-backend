import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findById(id: number): Promise<UserEntity | null>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract create(user: UserEntity): Promise<UserEntity>;
  abstract update(id: number, user: UserEntity): Promise<UserEntity>;
  abstract delete(id: number): Promise<void>;
  abstract updateRefreshToken(id: number, token: string): Promise<void>;
}