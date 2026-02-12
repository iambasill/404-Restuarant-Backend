import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateFooterDto {
  @IsString()
  @IsNotEmpty()
  productsTitle: string;

  @IsString()
  @IsNotEmpty()
  legalTitle: string;

  @IsString()
  @IsNotEmpty()
  contactTitle: string;

  @IsString()
  @IsNotEmpty()
  acceptTitle: string;
}