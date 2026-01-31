import { IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class ItemOrderDto {
  @IsNumber()
  id: number;

  @IsNumber()
  order: number;
  
}

export class BulkUpdateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemOrderDto)
  items: ItemOrderDto[];
}
