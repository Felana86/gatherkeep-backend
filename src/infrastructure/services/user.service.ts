import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from '../../core/domain/repositories/IUserRepository';
import { CreateUserDto } from '../../core/domain/dtos/create-user.dto';
import { UserEntity } from '../../core/domain/entities/user.entity';
import { UpdateUserDto } from '../../core/domain/dtos/update-user.dto';


@Injectable()
export class UserService {
    constructor(private readonly userRepository: IUserRepository) {}

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const { password, ...data } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 12);
        return this.userRepository.create({
            password: hashedPassword,
            ...data
        })

    }

    async findAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.findAll();
    }
    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findByEmail(email)
    }

    /*async update(id: number, data: {refreshToken: string}): Promise<UserEntity | null> {
        return await this.userRepository.update(id, data );
    }*/

    async update(id: number, data: UpdateUserDto): Promise<UserEntity | null> {
        return this.userRepository.update(id, data);
    }

    async findById(id: number): Promise<UserEntity | null> {
        return this.userRepository.findById(id);
    }

    async delete(id: number): Promise<void> {
        return this.userRepository.delete(id);
    }
}