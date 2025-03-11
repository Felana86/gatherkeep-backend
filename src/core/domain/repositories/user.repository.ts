import {UserEntity} from "../entities/user.entity";

export abstract class IUserRepository {
    abstract create(user: Partial<UserEntity>): Promise<UserEntity>;
    abstract findByEmail(email: string): Promise<UserEntity | null>;
    abstract findById(id: number): Promise<UserEntity | null>;
    abstract update(id: number, data: Partial<UserEntity>): Promise<UserEntity>;
    abstract delete(id: number): Promise<void>;
}