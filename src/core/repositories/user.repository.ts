import { UserEntity } from '../domain/entities/user.entity';

export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  create(user: UserEntity): Promise<UserEntity>;
  update(id: number, user: UserEntity): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}