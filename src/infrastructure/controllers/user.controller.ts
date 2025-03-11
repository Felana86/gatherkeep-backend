import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {UserService} from "../services/user.service";
import {UserEntity} from "../../domain/entities/user.entity";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signUp')
    async signUp(@Body() body: { email: string; password: string; firstName?: string; lastName?: string}) {
        return this.userService.createUser(body.email, body.password, body.firstName, body.lastName)
    }

    @Get(':email')
    async getUser(@Param( 'email' ) email: string): Promise<UserEntity | null> {
        return this.userService.findByEmail(email);
    }
}