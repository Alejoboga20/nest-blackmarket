import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'This is a product name',
    title: 'Product Name',
    description: 'Name of the product',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'This is a description',
    title: 'Product Description',
    description: 'Description of the product',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 10,
    title: 'Product Stock',
    description: 'amount of available items',
    required: true,
  })
  @IsNumber()
  @IsInt()
  @Min(0)
  numAvailableItems: number;

  @ApiProperty({
    example: 99.99,
    title: 'Product Price',
    description: 'price of the product',
    required: true,
  })
  @IsNumber()
  @IsPositive()
  unitPrice: number;

  @ApiProperty({
    example: ProductState.A,
    title: 'Product Status',
    description: 'status of the product',
    required: true,
    enum: ProductState,
    enumName: 'ProductState',
  })
  @IsString()
  @IsEnum(ProductState)
  state: ProductState;
}
