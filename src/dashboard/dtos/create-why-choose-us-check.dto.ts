import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateWhyChooseUsCheckDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsUUID()
  @IsOptional()
  organizationId?: string;
}

export class UpdateWhyChooseUsCheckDto {
  @IsString()
  @IsOptional()
  text?: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}