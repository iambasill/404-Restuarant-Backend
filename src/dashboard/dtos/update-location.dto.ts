import { IsString, IsNotEmpty, IsUrl, IsUUID, IsOptional } from 'class-validator';

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

  @IsUUID()
  @IsOptional()
  organizationId?: string;
}
