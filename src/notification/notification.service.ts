import { Inject, Injectable } from '@nestjs/common';
import twilio from 'twilio';
import * as nodemailer from 'nodemailer';
import { SmsMessageDto } from './dto/sms.message.dot';
import { EmailMessageDto } from './dto/email.message.dto';
import type { ConfigType } from '@nestjs/config';
import { mailerConfig, twilioConfig } from './config/notificaton.config';

@Injectable()
export class NotificationService {
  private readonly twilioClient;
  private readonly emailTransporter;
  
  constructor(
    @Inject(mailerConfig.KEY)
    private readonly twillo: ConfigType<typeof twilioConfig>,

        @Inject(mailerConfig.KEY)
    private readonly mailer: ConfigType<typeof mailerConfig>,
  ) {
    // Initialize Twilio client
    this.twilioClient = twilio(
      this.twillo.TWILIO_ACCOUNT_SID,
      this.twillo.TWILIO_AUTH_TOKEN,
    );

    // Initialize Nodemailer transporter for email
    this.emailTransporter = nodemailer.createTransport({
      host: this.mailer.EMAIL_HOST,
      port: this.mailer.EMAIL_PORT,
      secure: this.mailer.EMAIL_PORT === 465,
      auth: {
        user: this.mailer.EMAIL_USER,
        pass: this.mailer.EMAIL_PASSWORD,
      },
    });


  }

  // Method to send message via SMS using Twilio
  async sendToMobile(message: SmsMessageDto) {
    try {
      const result = await this.twilioClient.messages.create(message);
      return result;
    } catch (error) {

      throw new Error(`Failed to send via SMS: ${error.message}`);
    }
  }

  // Method to send via email using Nodemailer
  async sendToEmail(message: EmailMessageDto) {
    try {
      const result = await this.emailTransporter.sendMail(message);
      return result;
    } catch (error) {

      throw new Error(`Failed to send via email: ${error.message}`);
    }
  }

  async sendToAll(smsMessage: SmsMessageDto, emailMessage: EmailMessageDto) {
    try {
      await this.sendToMobile(smsMessage);
      await this.sendToEmail(emailMessage);
    } catch (error) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }
}