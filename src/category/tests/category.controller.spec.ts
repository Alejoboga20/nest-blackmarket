import { Test } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';
import { CategoryRepository } from '../repositories/category.repository';
import {
  categoryServiceMock,
  createCategoryDtoMock,
  updateCategoryDtoMock,
} from './category.mock';

const id = uuid();

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: categoryServiceMock,
        },
        {
          provide: CategoryRepository,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call categoryService.findAll', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call categoryService.findOne with id', async () => {
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    it('should call categoryService.create with correct params', async () => {
      await controller.create(createCategoryDtoMock);
      expect(service.create).toHaveBeenCalledWith(createCategoryDtoMock);
    });
  });

  describe('update', () => {
    it('should call categoryService.update with correct params', async () => {
      await controller.update(id, updateCategoryDtoMock);
      expect(service.update).toHaveBeenCalledWith(id, updateCategoryDtoMock);
    });
  });

  describe('remove', () => {
    it('should call categoryService.remove with id', async () => {
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
