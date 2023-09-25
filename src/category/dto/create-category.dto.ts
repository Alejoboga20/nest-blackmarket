import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Furtniture',
    title: 'Category Name',
    description: 'Name of the category',
    required: true,
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiPropertyOptional({
    example: 'Furniture for the house',
    title: 'Category Description',
    description: 'Description of the category',
  })
  @IsString()
  @MinLength(10)
  @IsOptional()
  description?: string;
}
