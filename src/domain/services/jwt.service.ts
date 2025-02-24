import { JwtPayloadDto } from '../../application/dtos/jwt-payload.dto';

export abstract class JwtService {
  abstract sign(payload: JwtPayloadDto, expiresIn?: string);
  abstract verify<T>(token: string, payload: JwtPayloadDto): Promise<boolean>;
}