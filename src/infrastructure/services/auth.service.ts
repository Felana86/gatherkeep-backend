import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../core/domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

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
        const isPassworldValid = await bcrypt.compare(password, user.password);
        if (!isPassworldValid) {
            throw new UnauthorizedException();
        }
        return user;
    }

    // génère un accessToken et un refreshToken et stocke le refreshToken en bdd
    async signIn(email: string, password: string) {
        const user = await this.validateUser(email, password);

        const accessToken =  this.jwtService.sign({ sub: user.id, email: user.email, role: user.role})
        const refreshToken =  this.jwtService.sign({ sub: user.id}, { expiresIn: '7d'})

        await this.userService.updateUser(user.id, refreshToken);

        return { accessToken, refreshToken };
    }

    //vérifie le refres token et génère un nouveau access et refresh
    async refreshToken(oldRefreshToken: string) {
        try {
            const decoded = this.jwtService.verify(oldRefreshToken);
            const user = await this.userService.findById(decoded.sub);

            if (!user || user.refreshToken !== oldRefreshToken) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const newAccessToken = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
            const newRefreshToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '7d' });

            await this.userService.updateUser(user.id, newRefreshToken );

            return { accessToken: newAccessToken, refreshToken: newRefreshToken };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}