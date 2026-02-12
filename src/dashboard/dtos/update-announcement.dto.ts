import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsUrl } from 'class-validator';

export class UpdateAnnouncementDto {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsString()
  @IsNotEmpty()
  buttonText: string;

  @IsString()
  @IsNotEmpty()
  buttonLink: string;
}

