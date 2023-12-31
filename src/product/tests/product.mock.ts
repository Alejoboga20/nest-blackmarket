import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';

import { PaginationDto } from '@src/common/dto/pagination.dto';
import { Sorting } from '@src/common/types/pagination';
import { CreateProductDto, UpdateProductDto } from '@product/dto';
import { ProductState } from '@product/types/product';
import { Product } from '@product/entities/product.entity';

export const mockProductRepository = {
  findOneBy: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  preload: jest.fn(),
  remove: jest.fn(),
};

export const mockProduct: Product = {
  id: uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  state: ProductState.N,
  numAvailableItems: faker.number.int({ min: 1, max: 100 }),
  unitPrice: faker.number.int({ min: 1, max: 100 }),
  createdAt: new Date(),
  updatedAt: new Date(),
  categories: [],
};

export const createProductDto: CreateProductDto = {
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  state: faker.helpers.enumValue(ProductState),
  numAvailableItems: faker.number.int({ min: 1, max: 100 }),
  unitPrice: faker.number.int({ min: 1, max: 100 }),
  categories: [],
};

export const updateProductDto: UpdateProductDto = {
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  state: ProductState.N,
  numAvailableItems: faker.number.int({ min: 1, max: 100 }),
  unitPrice: faker.number.int({ min: 1, max: 100 }),
  categories: [],
};

export const paginationDto: PaginationDto = {
  limit: 10,
  offset: 0,
  sort: Sorting.DESC,
};
