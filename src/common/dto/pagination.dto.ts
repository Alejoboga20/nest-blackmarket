import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Sorting } from '../types/pagination';

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

  @IsEnum(Sorting)
  @IsOptional()
  sort?: Sorting;
}
