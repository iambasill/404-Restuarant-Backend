import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ConfigModule } from '@nestjs/config';
import { UserRegistrationListener } from './listeners/user-registration.listener';
import { OtpModule } from 'src/otp/otp.module';
import { ForgotPasswordListener } from './listeners/forgot-password.listener';
import { mailerConfig, twilioConfig } from './config/notificaton.config';

@Module({
  imports: [
    ConfigModule.forFeature(twilioConfig),
    ConfigModule.forFeature(mailerConfig),
     OtpModule],
  providers: [
    NotificationService,
    UserRegistrationListener,
    ForgotPasswordListener,
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
