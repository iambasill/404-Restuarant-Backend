import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateWhyChooseUsCheckDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}

export class UpdateWhyChooseUsCheckDto {
  @IsString()
  @IsOptional()
  text?: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}