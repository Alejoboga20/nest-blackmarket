import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  ParseUUIDPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateProductDto, UpdateProductDto } from '@product/dto';
import { ProductService } from '@product/product.service';
import { PaginationDto } from '@common/dto/pagination.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { ProductDescription } from './decorators/product-description.decorator';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ProductDescription('findOne')
  @Get(':searchTerm')
  findOne(@Param('searchTerm') searchTerm: string) {
    return this.productService.findOne(searchTerm);
  }

  @ProductDescription('findAll')
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productService.findAll(paginationDto);
  }

  @ProductDescription('create', { isPrivate: true })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ProductDescription('update', { isPrivate: true })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @ProductDescription('delete')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }
}
