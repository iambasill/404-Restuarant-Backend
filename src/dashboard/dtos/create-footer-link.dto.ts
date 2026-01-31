import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateFooterLinkDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsUUID()
  @IsOptional()
  organizationId?: string;
}

export class UpdateFooterLinkDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}
