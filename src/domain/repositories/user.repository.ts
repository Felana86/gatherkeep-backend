import { UserEntity } from '../entities/user.entity';

export interface UserRepositoryDomain {
   findById(id: number): Promise<UserEntity | null>;
   findByEmail(email: string): Promise<UserEntity | null>;
   findAll(): Promise<UserEntity[]>;
   create(user: UserEntity): Promise<UserEntity>;
   update(id: number, updates: Partial<UserEntity>): Promise<UserEntity>;
   delete(id: number): Promise<string>;
   updateRefreshToken(id: number, refreshToken: string, expiresAt: Date): Promise<void>;
   save(id: number, updates: Partial<UserEntity>): Promise<UserEntity>;
}