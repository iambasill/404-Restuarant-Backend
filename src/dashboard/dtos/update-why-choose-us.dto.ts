import { IsString, IsNotEmpty, IsUrl, IsUUID, IsOptional } from 'class-validator';

export class UpdateWhyChooseUsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  contentParagraph1: string;

  @IsString()
  @IsNotEmpty()
  contentParagraph2: string;

  @IsUUID()
  @IsOptional()
  organizationId?: string;
}