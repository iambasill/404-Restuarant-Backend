import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async createHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  public async comparePassword(
    password: string | Buffer,
    hashedPassword: string,
  ): Promise<boolean> {
    const valid = await bcrypt.compare(password, hashedPassword);
    return valid;
  }
}
