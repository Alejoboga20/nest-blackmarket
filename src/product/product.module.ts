import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '@product/entities/product.entity';
import { ProductRepository } from '@product/repositories/product.repository';
import { ProductService } from '@product/product.service';
import { ProductController } from '@product/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
