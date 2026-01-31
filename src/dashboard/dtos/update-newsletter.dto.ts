import { IsString, IsNotEmpty, IsUrl, IsUUID, IsOptional } from 'class-validator';

export class UpdateNewsletterDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  placeholder: string;

  @IsString()
  @IsNotEmpty()
  buttonText: string;

  @IsUrl()
  @IsNotEmpty()
  backgroundImage: string;

  @IsUUID()
  @IsOptional()
  organizationId?: string;
}
