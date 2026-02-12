import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateMenuSectionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  buttonText: string;
}
