import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userPayload } from './interface/user.payload.request';
import { Request } from 'express';
import { CreateUserSessionDto } from 'src/user/dtos/user.session.dto';
import { UserSession } from 'src/user/entities/user.session.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/create.user.entity';
import { ConfigService } from '@nestjs/config';
import { randomInt } from 'crypto';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly otpServices: OtpService,

    @InjectRepository(UserSession)
    private sessionRepository: Repository<UserSession>,
  ) {}

  async generateToken(
    payload: userPayload & Record<string, any>,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: '3600s',
      secret: this.config.getOrThrow('JWT_TOKEN_SECRET'),
    });
  }

  async generateAuthToken(
    payload: userPayload & Record<string, any>,
  ): Promise<{ token: string; refreshToken: string }> {
    const token = await this.generateToken(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '3h',
      secret: this.config.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
    });
    return { token, refreshToken };
  }

  async newSession(session: CreateUserSessionDto) {
    try {
      let newSession = this.sessionRepository.create(session);
      await this.sessionRepository.save(newSession);
    } catch (error) {
      throw error;
    }
  }

  async verifyAccount(emailId: string, token: string) {
    await this.otpServices.verifyOtpCode(emailId, token);
  }
}
