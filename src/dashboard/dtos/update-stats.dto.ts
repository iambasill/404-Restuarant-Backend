import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class UpdateStatsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

}
