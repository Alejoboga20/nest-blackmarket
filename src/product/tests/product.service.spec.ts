import {
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { ProductService } from '@product/product.service';
import { Product } from '@product/entities/product.entity';
import { ErrorCodes } from '@common/types/error';
import {
  paginationDto,
  createProductDto,
  updateProductDto,
  mockProduct,
  mockRepository,
} from './product.mock';
import { ProductRepository } from '../repositories/product.repository';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
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
      mockRepository.findOneBy.mockReturnValueOnce(product);

      const result = await service.findOne('someTerm');
      expect(result).toEqual(product);
    });

    it('should throw NotFoundException if product does not exist', () => {
      mockRepository.findOneBy.mockReturnValueOnce(null);

      expect(service.findOne('someTerm')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const product = new Product();

      mockRepository.find.mockReturnValueOnce([product]);
      const result = await service.findAll(paginationDto);

      expect(result).toEqual([product]);
    });

    it('should handle database errors', () => {
      mockRepository.find.mockRejectedValue({ code: 'someDbError' });

      expect(service.findAll(paginationDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('create', () => {
    it('should return a product if it was created', async () => {
      mockRepository.create.mockReturnValueOnce({ ...createProductDto });
      const result = await service.create(createProductDto);

      expect(result).toEqual(createProductDto);
    });

    it('should throw BadRequestException when name is duplicated', async () => {
      mockRepository.create.mockReturnValueOnce({ ...createProductDto });
      mockRepository.save.mockRejectedValueOnce({
        code: ErrorCodes.DUPLICATED_ENTITY,
      });

      await expect(service.create(createProductDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    const id = uuid();

    it('should return a product if it was successfully updated', async () => {
      mockRepository.preload.mockReturnValueOnce({
        ...updateProductDto,
        id,
      });
      const result = await service.update(id, updateProductDto);

      expect(result).toEqual({ ...updateProductDto, id });
    });

    it('should throw NotFoundException when the product is not found', async () => {
      mockRepository.preload.mockReturnValueOnce(undefined);

      await expect(service.update(id, updateProductDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when name is duplicated', async () => {
      mockRepository.preload.mockReturnValueOnce({
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
    it('should successfully remove a product when it exists', async () => {
      service.findOne = jest.fn().mockResolvedValue(mockProduct);
      mockRepository.remove.mockResolvedValue(undefined);

      await expect(service.remove(mockProduct.id)).resolves.toBeUndefined();

      expect(service.findOne).toHaveBeenCalledWith(mockProduct.id);
      expect(mockRepository.remove).toHaveBeenCalledWith(mockProduct);
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
