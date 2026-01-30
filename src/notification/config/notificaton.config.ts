import { registerAs } from '@nestjs/config';

 const twilioConfig = registerAs('twilio', () => ({
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
}));

 const mailerConfig = registerAs('mailer', () => ({
  APP_NAME: process.env.APP_NAME || "MY COMPANY",
  MAIL_FROM: process.env.MAIL_FROM,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: Number(process.env.EMAIL_PORT),
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
}));

export { twilioConfig, mailerConfig}