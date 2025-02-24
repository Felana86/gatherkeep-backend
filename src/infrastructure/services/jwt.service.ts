import * as jwt from 'jsonwebtoken';
import { JwtService as IJwtService} from './jwt.service';


export class JwtService implements IJwtService {
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

  async sign(payload: { id: number; email: string; role: string }) {
    return jwt.sign(
      payload,
      this.accessSecret,
      {expiresIn: "15m"}
    )
  }

  async verify<T>(token: string, payload: { id: number; email: string; role: string }) {
    return jwt.verify(token, this.accessSecret) as T;
  }
}