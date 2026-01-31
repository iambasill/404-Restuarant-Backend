import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class UpdateTestimonialsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUUID()
  @IsOptional()
  organizationId?: string;
}