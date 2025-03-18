import { Body, Controller, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './DTOs/sign-up.dto';
import {Request, Response } from 'express';
import { AuthService } from '../../application/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body:SignUpDto): Promise<{ message: string, user }> {
    const user = await this.authService.signUp(body)
    return { message: "Utilisateur a été créé avec succès", user }
  }

  @Post('signin')
  async signIn(
    @Body() body:{email: string, password: string},
    @Res() res: Response,
    ): Promise<{ accessToken: string, refreshToken: string }> {

    const user = await this.authService.signIn(body.email, body.password);

    res.cookie('accessToken', user.accessToken, {
      httpOnly: true,
      sameSite: 'strict'
    });

    res.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/auth/refresh'
    });

    return user;
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response){

    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    const newTokens = await this.authService.generateRefreshToken(refreshToken);

    res.cookie('accessToken', newTokens.accessToken, {
      httpOnly: true,
      sameSite: 'strict'
    });

    res.cookie('refreshToken', newTokens.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/auth/refresh'
    });
  }

  @Post('logout')
  async logout(@Body('userId') data: {userId: number, refreshToken: string}) {
    return this.authService.revokeRefreshToken(data.userId, data.refreshToken)
  }

}