import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from '../../../core/domain/repositories/user.repository';
import { UserEntity } from '../../../core/domain/entities/user.entity';
import { CreateUserDto } from '../../../core/domain/dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: IUserRepository) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const { password, ...data } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 12);
        return this.userRepository.create({
            password: hashedPassword,
            ...data
        })

    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findByEmail(email)
    }

    async updateUser(id: number, refreshToken: string): Promise<UserEntity | null> {
        return await this.userRepository.update(id, { refreshToken });
    }

    async findById(id: number): Promise<UserEntity | null> {
        return this.userRepository.findById(id);
    }

    async delete(id: number): Promise<void> {
        return this.userRepository.delete(id);
    }
}