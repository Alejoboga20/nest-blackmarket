import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from '@category/category.module';
import { Product } from '@product/entities/product.entity';
import { ProductRepository } from '@product/repositories/product.repository';
import { ProductService } from '@product/product.service';
import { ProductController } from '@product/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
