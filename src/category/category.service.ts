import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In } from 'typeorm';

import { categoryMessages } from '@common/constants/messages';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repositories/category.repository';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category)
      throw new NotFoundException(categoryMessages.CATEGORY_NOT_FOUND);

    return category;
  }

  async findBatch(ids: string[]): Promise<Category[]> {
    try {
      const categories = await this.categoryRepository.find({
        where: { id: In(ids) },
      });
      const filteredCategories = categories.filter((category) => !!category);

      return filteredCategories;
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.createCategory(
      createCategoryDto,
    );

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    if (!category)
      throw new NotFoundException(categoryMessages.CATEGORY_NOT_FOUND);

    const updatedCategory = await this.categoryRepository.updateCategory(
      id,
      updateCategoryDto,
    );

    return updatedCategory;
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}
