import { Test } from '@nestjs/testing';

import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Sorting } from '../../common/types/pagination';
import { ProductState } from '../types/product';
import { UpdateProductDto } from '../dto';
import { ProductRepository } from '../repositories/product.repository';
import { mockRepository } from './product.mock';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const mockService = {
      findOne: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    const module = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockService,
        },
        { provide: ProductRepository, useValue: mockRepository },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should call productService.findOne with correct params', async () => {
      const searchTerm = 'someTerm';
      await controller.findOne(searchTerm);
      expect(service.findOne).toHaveBeenCalledWith(searchTerm);
    });
  });

  describe('findAll', () => {
    it('should call productService.findAll with correct params', async () => {
      const paginationDto: PaginationDto = {
        limit: 10,
        offset: 0,
        sort: Sorting.ASC,
      };
      await controller.findAll(paginationDto);
      expect(service.findAll).toHaveBeenCalledWith(paginationDto);
    });
  });

  describe('create', () => {
    it('should call productService.create with correct params', async () => {
      const createProductDto: CreateProductDto = {
        name: 'ProductName',
        description: 'ProductDescription',
        numAvailableItems: 10,
        state: ProductState.A,
        unitPrice: 10,
      };
      await controller.create(createProductDto);
      expect(service.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('update', () => {
    it('should call productService.update with correct params', async () => {
      const id = 'someId';
      const updateProductDto: UpdateProductDto = {
        name: 'UpdatedProductName',
      };
      await controller.update(id, updateProductDto);
      expect(service.update).toHaveBeenCalledWith(id, updateProductDto);
    });
  });

  describe('delete', () => {
    it('should call productService.remove with correct params', async () => {
      const id = 'someId';
      await controller.delete(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
