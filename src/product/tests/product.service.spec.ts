import {
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { CategoryService } from '@category/category.service';
import { CategoryRepository } from '@category/repositories/category.repository';
import { ProductService } from '@product/product.service';
import { Product } from '@product/entities/product.entity';
import { ErrorCodes } from '@common/types/error';
import {
  paginationDto,
  createProductDto,
  updateProductDto,
  mockProduct,
  mockProductRepository,
} from './product.mock';
import { mockCategoryRepository } from './category.mock';
import { ProductRepository } from '../repositories/product.repository';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        CategoryService,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
        {
          provide: CategoryRepository,
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a product if it exists', async () => {
      const product = new Product();
      mockProductRepository.findOneBy.mockReturnValueOnce(product);

      const result = await service.findOne('someTerm');
      expect(result).toEqual(product);
    });

    it('should throw NotFoundException if product does not exist', () => {
      mockProductRepository.findOneBy.mockReturnValueOnce(null);

      expect(service.findOne('someTerm')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const product = new Product();

      mockProductRepository.find.mockReturnValueOnce([product]);
      const result = await service.findAll(paginationDto);

      expect(result).toEqual([product]);
    });

    it('should handle database errors', () => {
      mockProductRepository.find.mockRejectedValue({ code: 'someDbError' });

      expect(service.findAll(paginationDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('update', () => {
    const id = uuid();

    it('should return a product if it was successfully updated', async () => {
      mockProductRepository.preload.mockResolvedValueOnce({
        ...updateProductDto,
        id,
      });
      mockProductRepository.save.mockResolvedValueOnce({
        ...updateProductDto,
        id,
      });
      mockProductRepository.findOneBy.mockResolvedValueOnce(updateProductDto);
      mockCategoryRepository.find.mockResolvedValueOnce([]);

      const result = await service.update(id, updateProductDto);

      expect(result).toEqual({ ...updateProductDto, id });
    });

    it('should throw NotFoundException when the product is not found', async () => {
      mockProductRepository.preload.mockReturnValueOnce(undefined);

      await expect(service.update(id, updateProductDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when name is duplicated', async () => {
      mockProductRepository.findOneBy.mockResolvedValueOnce(updateProductDto);
      mockProductRepository.preload.mockReturnValueOnce({
        ...updateProductDto,
        id,
      });
      mockProductRepository.save.mockRejectedValue({
        code: ErrorCodes.DUPLICATED_ENTITY,
      });

      await expect(service.update(id, updateProductDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
  describe('create', () => {
    it('should return a product if it was created', async () => {
      mockCategoryRepository.find.mockResolvedValueOnce([]);
      mockProductRepository.create.mockResolvedValueOnce({
        ...createProductDto,
      });
      mockProductRepository.save.mockReturnValueOnce({ ...createProductDto });

      const result = await service.create(createProductDto);

      expect(result).toEqual(createProductDto);
    });

    it('should throw BadRequestException when name is duplicated', async () => {
      mockProductRepository.create.mockResolvedValueOnce({
        ...createProductDto,
      });
      mockProductRepository.save.mockRejectedValueOnce({
        code: ErrorCodes.DUPLICATED_ENTITY,
      });

      await expect(service.create(createProductDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('should successfully remove a product when it exists', async () => {
      service.findOne = jest.fn().mockResolvedValue(mockProduct);
      mockProductRepository.remove.mockResolvedValue(undefined);

      await expect(service.remove(mockProduct.id)).resolves.toBeUndefined();

      expect(service.findOne).toHaveBeenCalledWith(mockProduct.id);
      expect(mockProductRepository.remove).toHaveBeenCalledWith(mockProduct);
    });

    it('should throw NotFoundException when the product does not exist', async () => {
      service.findOne = jest.fn().mockRejectedValue(new NotFoundException());

      await expect(service.remove(mockProduct.id)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findOne).toHaveBeenCalledWith(mockProduct.id);
    });
  });
});
