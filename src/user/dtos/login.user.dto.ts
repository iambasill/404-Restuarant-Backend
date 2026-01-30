import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Max(30)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Max(30)
  password: string;
}
