import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Sorting } from '../types/pagination';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    example: 10,
    title: 'Limit',
    description: 'Amount of items per page',
    required: true,
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsInt()
  @IsOptional()
  limit?: number;

  @ApiProperty({
    example: 5,
    title: 'Offset',
    description: 'Amount of items to skip',
    required: true,
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsInt()
  @IsOptional()
  offset?: number;

  @ApiProperty({
    example: 5,
    title: 'Sorting',
    description: 'Order of the items',
    required: true,
  })
  @IsEnum(Sorting)
  @IsOptional()
  sort?: Sorting;
}
