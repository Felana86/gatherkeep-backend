import { UserEntity } from "../entities/user.entity";
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

export abstract class IUserRepository {
    abstract create(user: CreateUserDto): Promise<UserEntity>;
    abstract findAll(): Promise<UserEntity[]>;
    abstract findByEmail(email: string): Promise<UserEntity | null>;
    abstract findById(id: number): Promise<UserEntity | null>;
    abstract update(id: number, data: UpdateUserDto): Promise<UserEntity | null>;
    abstract delete(id: number): Promise<void>;
}