import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { validate as isUUID } from 'uuid';

import { CreateProductDto, UpdateProductDto } from '@product/dto';
import { Product } from '@product/entities/product.entity';
import { ProductRepository } from '@product/repositories/product.repository';
import { CategoryService } from '@category/category.service';
import { PaginationDto } from '@common/dto/pagination.dto';
import { ErrorCodes } from '@common/types/error';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
  ) {}

  async findOne(searchTerm: string): Promise<Product> {
    let product: Product;

    if (isUUID(searchTerm)) {
      product = await this.productRepository.findOneBy({ id: searchTerm });
    } else {
      product = await this.productRepository.findOneBy({ name: searchTerm });
    }

    if (!product) throw new NotFoundException();

    return product;
  }

  async findAll(paginationDto: PaginationDto): Promise<Product[]> {
    const { limit = 10, offset = 0, sort = 'DESC' } = paginationDto;

    try {
      const products = await this.productRepository.find({
        take: limit,
        skip: offset,
        order: {
          createdAt: sort,
        },
      });

      return products;
    } catch (error) {
      console.log({ error });
      this.handleDbError(error);
    }
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categories, ...productRest } = createProductDto;
    const categoriesEntities = await this.categoryService.findBatch(categories);

    try {
      const product = this.productRepository.create({
        ...productRest,
        categories: categoriesEntities,
      });
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { categories = [], ...productRest } = updateProductDto;

    const product = await this.findOne(id);
    const categoriesEntities = await this.categoryService.findBatch(categories);

    const productToUpdate = await this.productRepository.preload({
      id,
      categories:
        categoriesEntities.length > 0 ? categoriesEntities : product.categories,
      ...productRest,
    });

    try {
      const updatedProduct = await this.productRepository.save(productToUpdate);
      return updatedProduct;
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  private handleDbError(error: any) {
    if (error.code === ErrorCodes.DUPLICATED_ENTITY)
      throw new BadRequestException(error.detail);

    throw new InternalServerErrorException();
  }
}
