import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';

import { CreateProductDto } from './dto';
import { ProductService } from './product.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':searchTerm')
  findOne(@Param('searchTerm') searchTerm: string) {
    return this.productService.findOne(searchTerm);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productService.findAll(paginationDto);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: CreateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }
}
