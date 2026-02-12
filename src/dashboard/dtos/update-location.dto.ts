import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateLocationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @IsUrl()
  @IsNotEmpty()
  mapUrl: string;

  @IsString()
  @IsNotEmpty()
  buttonText: string;
}
