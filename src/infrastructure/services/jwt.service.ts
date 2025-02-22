import * as jwt from 'jsonwebtoken';

export class JwtService {
  private readonly accessSecret = process.env.JWT_ACCESS_SECRET || "secret";
  private readonly refreshSecret = process.env.JWT_REFRESH_SECRET || "secret";

  async generateAccessToken(user: { id: number; email: string; role: string }) {
    const payload = { sub: {userId: user.id}, email: user.email };
    return jwt.sign(
      payload,
      this.accessSecret,
      {expiresIn: "15m"}
    )
  }

  async generateRefreshToken(user: { id: number }) {
    const payload = { sub: user.id }
    return jwt.sign(
      payload,
      this.refreshSecret,
      { expiresIn: "7d"}
    )
  }
}