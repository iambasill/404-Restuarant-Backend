import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { BcryptProvider } from './providers/bcrypt.provider';
import { HashingProvider } from './providers/hashing.provider';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSession } from 'src/user/entities/user.session.entity';
import { NotificationModule } from 'src/notification/notification.module';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [
    UserModule,
    NotificationModule,
    TypeOrmModule.forFeature([UserSession]),
    JwtModule.register({
      secret: process.env.JWT_TOKEN_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    OtpModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
