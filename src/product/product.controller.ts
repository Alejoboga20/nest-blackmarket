import { Controller, Post, Body, Get, Query } from '@nestjs/common';

import { CreateProductDto } from './dto';
import { ProductService } from './product.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productService.findAll(paginationDto);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
}
