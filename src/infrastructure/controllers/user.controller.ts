import {Controller, Get, Param} from "@nestjs/common";
import { UserEntity } from '../../core/domain/entities/user.entity';
import { UserService } from '../../application/services/user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':email')
    async getUser(@Param( 'email' ) email: string): Promise<UserEntity | null> {
        return this.userService.findByEmail(email);
    }
}