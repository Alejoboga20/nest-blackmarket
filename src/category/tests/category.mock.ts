import { CreateCategoryDto } from '../dto/create-category.dto';
import { faker } from '@faker-js/faker';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export const categoryServiceMock = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  findBatch: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

export const createCategoryDtoMock: CreateCategoryDto = {
  name: faker.commerce.productAdjective(),
  description: faker.commerce.productDescription(),
};

export const updateCategoryDtoMock: UpdateCategoryDto = {
  description: faker.commerce.productDescription(),
};
