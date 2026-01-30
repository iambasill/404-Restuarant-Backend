import { IsEmail, IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';

export class verifyAccountDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
