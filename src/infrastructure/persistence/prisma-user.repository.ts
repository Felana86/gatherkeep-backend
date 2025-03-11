import {Injectable} from "@nestjs/common";
import {PrismaService} from "./prisma.service";
import {IUserRepository} from "../../core/domain/repositories/user.repository";
import {UserEntity} from "../../core/domain/entities/user.entity";

@Injectable()
export class PrismaUserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(user: Partial<UserEntity>): Promise<UserEntity> {
            return this.prisma.user.create({ data: user });
        }

        async findByEmail(email: string): Promise<UserEntity | null> {
            return this.prisma.user.findUnique({ where: { email } });
        }

        async findById(id: number): Promise<UserEntity | null> {
            return this.prisma.user.findUnique({ where: { id } });
        }

        async update(id: number, data: Partial<UserEntity>): Promise<UserEntity> {
            return this.prisma.user.update({ where: { id }, data });
        }

        async delete(id: number): Promise<void> {
            await this.prisma.user.delete({ where: { id } });
        }
}