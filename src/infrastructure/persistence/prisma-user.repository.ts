import {Injectable} from "@nestjs/common";
import {PrismaService} from "./prisma.service";
import {IUserRepository} from "../../core/domain/repositories/IUserRepository";
import {UserEntity} from "../../core/domain/entities/user.entity";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../core/domain/dtos/create-user.dto';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
    constructor(
      private readonly prisma: PrismaService) {
    }

    async create(user: CreateUserDto): Promise<UserEntity> {
        const { email, password, ...data } = user;
        const emailExists = await this.prisma.user.findUnique({ where: { email }})
        if (emailExists) throw new Error('Email already exists');

        const hashedPassword = await bcrypt.hash(password, 10)
        return this.prisma.user.create({
            data: {
                password: hashedPassword,
                email,
                ...data
            }
        })
    }


    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findById(id: number): Promise<UserEntity> {
        return this.prisma.user.findUniqueOrThrow({ where: { id } });
    }

    async update(id: number, data: Partial<CreateUserDto>): Promise<UserEntity> {
        return this.prisma.user.update({ where: { id }, data });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.user.delete({ where: { id } });
    }
}