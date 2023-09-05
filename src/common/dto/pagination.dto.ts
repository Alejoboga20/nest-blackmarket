import { IsIn, IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { FindOptionsOrderValue } from 'typeorm';

export class PaginationDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsInt()
  @IsOptional()
  limit?: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsInt()
  @IsOptional()
  offset?: number;

  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  @IsOptional()
  sort?: FindOptionsOrderValue;
}
