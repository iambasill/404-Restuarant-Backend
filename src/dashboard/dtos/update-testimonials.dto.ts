import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateTestimonialsDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}