import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateWhyChooseUsItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}

export class UpdateWhyChooseUsItemDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}
