import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import { UserEntity } from '../../core/domain/entities/user.entity';
import { UserService } from '../services/user/user.service';
import { CreateUserDto } from '../../core/domain/dtos/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signUp')
    async signUp(@Body() body:CreateUserDto) {
        return this.userService.createUser(body)
    }

    @Get(':email')
    async getUser(@Param( 'email' ) email: string): Promise<UserEntity | null> {
        return this.userService.findByEmail(email);
    }
}