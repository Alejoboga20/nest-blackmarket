import {
  IsEnum,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { ProductState } from '../types/product';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsInt()
  @Min(0)
  numAvailableItems: number;

  @IsNumber()
  @IsPositive()
  unitPrice: number;

  @IsString()
  @IsEnum(ProductState)
  state: ProductState;
}
