import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { UserEntity } from '../../core/domain/entities/user.entity';
import { SignUpDto } from '../../infrastructure/controllers/DTOs/sign-up.dto';


@Injectable()
export class AuthService {
    constructor(
      private readonly userService: UserService,
      private readonly jwtService: JwtService,
      ) {}

    // Vérifie si l'utilisateur existe et si le mot de passe est correct
    async validateUser(email: string, password: string): Promise<UserEntity> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Mot de passe non valide');
        }
        return user;
    }
    async signUp(dto: SignUpDto): Promise<UserEntity> {
        return this.userService.create(dto);
    }

    // génère un accessToken et un refreshToken et stocke le refreshToken en bdd
    async signIn(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
        const user = await this.validateUser(email, password);

        const accessToken =  this.jwtService.sign({ sub: user.id, email: user.email, role: user.role})
        const refreshToken =  this.jwtService.sign({ sub: user.id}, { expiresIn: '7d'})

        await this.userService.update(user.id, {refreshToken});

        return { accessToken, refreshToken };
    }

    //vérifie le refresh token et génère un nouveau access et refresh
    async generateRefreshToken(oldRefreshToken: string) {
        try {
            const decoded = this.jwtService.verify(oldRefreshToken);
            const user = await this.userService.findById(decoded.sub);

            if (!user || user.refreshToken !== oldRefreshToken) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const newAccessToken = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
            const newRefreshToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '7d' });

            await this.userService.update(user.id, {refreshToken: newRefreshToken });

            return { accessToken: newAccessToken, refreshToken: newRefreshToken };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async revokeRefreshToken(userId: number, refreshToken: string): Promise<void> {
        await this.userService.update(userId, {refreshToken});
    }
}