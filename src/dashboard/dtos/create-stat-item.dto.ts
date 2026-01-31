import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateStatItemDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsNumber()
  @IsOptional()
  order?: number;


}

export class UpdateStatItemDto {
  @IsString()
  @IsOptional()
  value?: string;

  @IsString()
  @IsOptional()
  label?: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}
