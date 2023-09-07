import {
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';

import { ProductService } from '../product.service';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dto';
import { ProductState } from '../types/product';
import { Sorting } from '../../common/types/pagination';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ErrorCodes } from '../../common/types/error';

describe('ProductService', () => {
  let service: ProductService;
  let mockRepository;

  beforeEach(async () => {
    mockRepository = {
      findOneBy: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      preload: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a product if it exists', async () => {
      const product = new Product();
      mockRepository.findOneBy.mockReturnValue(product);

      const result = await service.findOne('someTerm');
      expect(result).toEqual(product);
    });

    it('should throw NotFoundException if product does not exist', () => {
      mockRepository.findOneBy.mockReturnValue(null);

      expect(service.findOne('someTerm')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const product = new Product();
      mockRepository.find.mockReturnValue([product]);

      const paginationDto: PaginationDto = {
        limit: 10,
        offset: 0,
        sort: Sorting.DESC,
      };
      const result = await service.findAll(paginationDto);

      expect(result).toEqual([product]);
    });

    it('should handle database errors', () => {
      mockRepository.find.mockRejectedValue({ code: 'someDbError' });

      const paginationDto: PaginationDto = {
        limit: 10,
        offset: 0,
        sort: Sorting.DESC,
      };
      expect(service.findAll(paginationDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('create', () => {
    const createProductDto: CreateProductDto = {
      name: 'someName',
      description: 'someDescription',
      state: ProductState.N,
      numAvailableItems: 10,
      unitPrice: 10,
    };

    it('should return a product if it was created', async () => {
      mockRepository.create.mockReturnValue({ ...createProductDto });

      const result = await service.create(createProductDto);
      expect(result).toEqual(createProductDto);
    });

    it('should throw BadRequestException when name is duplicated', async () => {
      mockRepository.create.mockReturnValue({ ...createProductDto });
      mockRepository.save.mockRejectedValue({
        code: ErrorCodes.DUPLICATED_ENTITY,
      });

      await expect(service.create(createProductDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    const id = uuid();
    const updateProductDto: UpdateProductDto = {
      name: 'newName',
      description: 'newDescription',
      state: ProductState.N,
      numAvailableItems: 20,
      unitPrice: 20,
    };

    it('should return a product if it was successfully updated', async () => {
      mockRepository.preload.mockReturnValue({
        ...updateProductDto,
        id,
      });
      const result = await service.update(id, updateProductDto);

      expect(result).toEqual({ ...updateProductDto, id });
    });

    it('should throw NotFoundException when the product is not found', async () => {
      mockRepository.preload.mockReturnValue(undefined);

      await expect(service.update(id, updateProductDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when name is duplicated', async () => {
      mockRepository.preload.mockReturnValue({
        ...updateProductDto,
        id,
      });
      mockRepository.save.mockRejectedValue({
        code: ErrorCodes.DUPLICATED_ENTITY,
      });

      await expect(service.update(id, updateProductDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    const id = uuid();

    it('should successfully remove a product when it exists', async () => {
      const mockProduct: Product = {
        id,
        name: 'someName',
        description: 'someDescription',
        state: ProductState.N,
        numAvailableItems: 10,
        unitPrice: 10,
        createdAt: new Date(),
      };
      service.findOne = jest.fn().mockResolvedValue(mockProduct);
      mockRepository.remove.mockResolvedValue(undefined);

      await expect(service.remove(id)).resolves.toBeUndefined();

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(mockRepository.remove).toHaveBeenCalledWith(mockProduct);
    });

    it('should throw NotFoundException when the product does not exist', async () => {
      service.findOne = jest.fn().mockRejectedValue(new NotFoundException());

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });
});
