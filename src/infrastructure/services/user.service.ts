import {Injectable} from "@nestjs/common";
import {IUserRepository} from "../../core/domain/repositories/user.repository";
import {UserEntity} from "../../core/domain/entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: IUserRepository) {}

    async createUser(email: string, password: string, firstName?: string, lastName?: string): Promise<UserEntity> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userRepository.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: 'HABITANT'
        })
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findByEmail(email)
    }
}