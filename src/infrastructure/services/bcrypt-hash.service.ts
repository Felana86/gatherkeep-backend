import { HashService } from '../../domain/services/hash.service';
import * as bcrypt from 'bcrypt';

export class BcryptHashService implements HashService {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}