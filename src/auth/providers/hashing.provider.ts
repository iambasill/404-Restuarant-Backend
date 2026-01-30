import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
  abstract createHash(password: string | Buffer): Promise<string>;
  abstract comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
