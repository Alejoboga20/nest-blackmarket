import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { CategoryService } from '../category.service';
import { CategoryRepository } from '../repositories/category.repository';
import {
  categoryRepositoryMock,
  findCategoriesMock,
  createCategoryDtoMock,
} from './category.mock';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryRepository,
          useValue: categoryRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      categoryRepositoryMock.find.mockReturnValueOnce([...findCategoriesMock]);
      const result = await service.findAll();

      expect(result).toEqual(findCategoriesMock);
    });
  });

  describe('findOne', () => {
    it('should return a category if it exists', async () => {
      categoryRepositoryMock.findOne.mockReturnValueOnce(findCategoriesMock[0]);
      const result = await service.findOne(findCategoriesMock[0].id);

      expect(result).toEqual(findCategoriesMock[0]);
    });

    it('should throw NotFoundException if category does not exist', async () => {
      categoryRepositoryMock.find.mockRejectedValue(null);

      expect(service.findOne('some id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findBatch', () => {
    const ids = findCategoriesMock.map((category) => category.id);
    it('should return an array of categories if they exist', async () => {
      categoryRepositoryMock.find.mockReturnValueOnce(findCategoriesMock);
      const result = await service.findBatch(ids);

      expect(result).toEqual(findCategoriesMock);
    });
    it('should return an empty array if categories do not exist', async () => {
      categoryRepositoryMock.find.mockReturnValueOnce([]);
      const result = await service.findBatch(ids);

      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    const id = uuid();
    it('should return a category if it was created', async () => {
      categoryRepositoryMock.createCategory.mockReturnValueOnce({
        ...createCategoryDtoMock,
        id,
      });
      const result = await service.create(createCategoryDtoMock);

      expect(result).toEqual({ ...createCategoryDtoMock, id });
    });
  });
});
