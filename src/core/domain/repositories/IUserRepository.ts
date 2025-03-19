import { UserEntity } from "../entities/user.entity";
import { CreateUserDto } from '../dtos/create-user.dto';

export abstract class IUserRepository {
    abstract create(user: CreateUserDto): Promise<UserEntity>;
    abstract findByEmail(email: string): Promise<UserEntity | null>;
    abstract findById(id: number): Promise<UserEntity | null>;
    abstract update(id: number, data: Partial<CreateUserDto>): Promise<UserEntity | null>;
    abstract delete(id: number): Promise<void>;
}