import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserEntity } from '../../core/domain/entities/user.entity';
import { UserService } from '../../infrastructure/services/user.service';
import { CreateUserDto } from '../../core/domain/dtos/create-user.dto';
import { UpdateUserDto } from '../../core/domain/dtos/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userService.create(createUserDto);
    }

    @Get('users')
    async getAllUsers(): Promise<UserEntity[]> {
        return this.userService.findAllUsers();
    }

    @Get(':email')
    async getUser(@Param( 'email' ) email: string): Promise<UserEntity | null> {
        return this.userService.findByEmail(email);
    }

    @Patch(':id')
    async updateUser(
      @Param('id') id: number,
      @Body() body:UpdateUserDto): Promise<UserEntity | null> {
        return this.userService.update(id, body);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        return this.userService.delete(id);
    }
}