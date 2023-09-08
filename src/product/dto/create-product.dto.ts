import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { ProductState } from '../types/product';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
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
