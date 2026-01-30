import { IsEmail, IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateUserDto {
  @IsString()
  @MaxLength(250)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MaxLength(250)
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  password: string;

  
  @IsString({ message: 'Role must be a string' })
  @IsIn(['user', 'admin'], { 
    message: 'Role must be one of: user, admin'
  })
  @IsNotEmpty({ message: 'Role is required' })
  role: string = 'user';

}
