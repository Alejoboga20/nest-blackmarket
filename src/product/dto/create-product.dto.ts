import {
  IsIn,
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
  num_available_items: number;

  @IsNumber()
  @IsPositive()
  unit_price: number;

  @IsString()
  @IsIn(Object.values(ProductState))
  state: ProductState;
}
