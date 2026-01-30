import { IsEmail, IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';

export class verifyAccountDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Max(30)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Max(6)
  token: string;
}
