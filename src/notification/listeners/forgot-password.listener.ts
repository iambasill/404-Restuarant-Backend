import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRegistrationEvent } from '../events/user.registration.event';
import { NotificationService } from '../notification.service';
import { EmailMessageDto } from '../dto/email.message.dto';
import { OtpService } from 'src/otp/otp.service';
import { ConfigService } from '@nestjs/config';
import { forgotPasswordEvent } from '../events/forgot.password.event';
import { createForgotHtmlEmail, createForgotTextEmail } from '../utils/email.style.utils';

@Injectable()
export class ForgotPasswordListener {
  
  constructor(
    private readonly notificationService: NotificationService,
    private readonly otpService: OtpService,
    private readonly configService: ConfigService,
  ) {}

  @OnEvent('forgot.password')
  async handleForgotPassword(event: forgotPasswordEvent): Promise<void> {
    try {
      
      const appName = this.configService.get('mailer.APP_NAME') 
      const mailFrom = this.configService.get('mailer.MAIL_FROM') 
      const supportEmail = this.configService.get('mailer.SUPPORT_EMAIL') 
      
      const token = await this.otpService.createOtpCode(event.email);
      
      // Create email message
      const message: EmailMessageDto = {
        from: mailFrom,
        to: event.email,
        subject: `Reset Your Password - ${appName}`,
        text: createForgotTextEmail(event.name, token, appName, supportEmail),
        html: createForgotHtmlEmail(event.name, token, appName, supportEmail),
      };

      // Send email
      await this.notificationService.sendToEmail(message);
      
      
    } catch (error) {
      throw new Error(`Failed to send password reset email to ${event.email}:`, error);
    }
  }


}