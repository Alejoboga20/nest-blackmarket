import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { CreateProductDto } from './dto';
import { Product } from './entities/product.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findOne(searchTerm: string) {
    let product: Product;

    if (isUUID(searchTerm)) {
      product = await this.productRepository.findOneBy({ id: searchTerm });
    } else {
      product = await this.productRepository.findOneBy({ name: searchTerm });
    }

    if (!product) throw new BadRequestException('Product not found');

    return product;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset, sort } = paginationDto;

    return await this.productRepository.find({
      take: limit,
      skip: offset,
      order: {
        created_at: sort,
      },
    });
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async update(id: string, updateProductDto: CreateProductDto) {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product) throw new BadRequestException('Product not found');

    try {
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDbError(error);
    }
  }

  private handleDbError(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Internal Server Error');
  }
}
