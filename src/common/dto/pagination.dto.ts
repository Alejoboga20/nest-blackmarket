import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Sorting } from '../types/pagination';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({
    example: 10,
    title: 'Limit',
    description: 'Amount of items per page',
    default: 10,
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsInt()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    example: 5,
    title: 'Offset',
    description: 'Amount of items to skip',
    default: 0,
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsInt()
  @IsOptional()
  offset?: number;

  @ApiPropertyOptional({
    example: 5,
    title: 'Sorting',
    description: 'Order of the items',
    default: Sorting.ASC,
  })
  @IsEnum(Sorting)
  @IsOptional()
  sort?: Sorting;
}
