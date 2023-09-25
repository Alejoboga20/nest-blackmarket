import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export const categoryServiceMock = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  findBatch: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

export const categoryRepositoryMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  createCategory: jest.fn(),
};

export const createCategoryDtoMock: CreateCategoryDto = {
  name: faker.commerce.productAdjective(),
  description: faker.commerce.productDescription(),
};

export const updateCategoryDtoMock: UpdateCategoryDto = {
  description: faker.commerce.productDescription(),
};

export const findCategoriesMock = [
  {
    id: uuid(),
    name: 'Second Category Name',
    description: 'Category Description',
  },
  {
    id: uuid(),
    name: 'Third Category Name',
    description: 'Category Description',
  },
  {
    id: uuid(),
    name: 'Fourth Category Name',
    description: 'Category Description',
  },
];
