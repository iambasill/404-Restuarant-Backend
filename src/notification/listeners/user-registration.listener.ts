import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRegistrationEvent } from '../events/user.registration.event';
import { NotificationService } from '../notification.service';
import { EmailMessageDto } from '../dto/email.message.dto';
import { OtpService } from 'src/otp/otp.service';
import { ConfigService } from '@nestjs/config';
import { createHtmlEmail, createPlainTextEmail } from '../utils/email.style.utils';

@Injectable()
export class UserRegistrationListener {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly otpService: OtpService,
    private readonly configService: ConfigService
  ) {}

  @OnEvent('user.created')
  async handleUserCreated(event: UserRegistrationEvent): Promise<void> {
    try {
      const appName = this.configService.get('mailer.APP_NAME')
      const mailFrom = this.configService.get('mailer.MAIL_FROM') 
      
      // Generate OTP token
      const token = await this.otpService.createOtpCode(event.email);
      
      // Create email message
      const message: EmailMessageDto = {
        from: mailFrom,
        to: event.email,
        subject: `Verify Your Email - Welcome to ${appName}`,
        text: createPlainTextEmail(event.name, token, appName),
        html: createHtmlEmail(event.name, token, appName),
      };

      // Send email
      await this.notificationService.sendToEmail(message);
      
    } catch (error) {
      throw new Error("Error sending email: ", error)
    }
  }


}