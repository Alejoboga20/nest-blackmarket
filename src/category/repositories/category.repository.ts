import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ErrorCodes } from '@common/types/error';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.create(createCategoryDto);
      await this.save(category);

      return category;
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.preload({ id, ...updateCategoryDto });

    try {
      await this.save(category);
      return category;
    } catch (error) {
      this.handleDbError(error);
    }
  }

  private handleDbError(error: Error & { code: string } & { detail: string }) {
    if (error.code === ErrorCodes.DUPLICATED_ENTITY) {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException();
  }
}
