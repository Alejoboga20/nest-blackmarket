import { v4 as uuid } from 'uuid';

import { PaginationDto } from '@src/common/dto/pagination.dto';
import { Sorting } from '@src/common/types/pagination';
import { CreateProductDto, UpdateProductDto } from '@product/dto';
import { ProductState } from '@product/types/product';
import { Product } from '@product/entities/product.entity';

export const mockProduct: Product = {
  id: uuid(),
  name: 'someName',
  description: 'someDescription',
  state: ProductState.N,
  numAvailableItems: 10,
  unitPrice: 10,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const createProductDto: CreateProductDto = {
  name: 'someName',
  description: 'someDescription',
  state: ProductState.N,
  numAvailableItems: 10,
  unitPrice: 10,
};

export const updateProductDto: UpdateProductDto = {
  name: 'newName',
  description: 'newDescription',
  state: ProductState.N,
  numAvailableItems: 20,
  unitPrice: 20,
};

export const paginationDto: PaginationDto = {
  limit: 10,
  offset: 0,
  sort: Sorting.DESC,
};
