import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsUrl, IsUUID } from 'class-validator';

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

  @IsUUID()
  @IsOptional()
  organizationId?: string;
}

