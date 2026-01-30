import { EmailMessageInterface } from '../interfaces/email.message.interface';

export class EmailMessageDto {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string | null;
}
