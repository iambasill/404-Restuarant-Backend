import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class UpdateMenuSectionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  buttonText: string;

  @IsUUID()
  @IsOptional()
  organizationId?: string;
}
