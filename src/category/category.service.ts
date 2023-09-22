import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';

import { categoryMessages } from '@common/constants/messages';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repositories/category.repository';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category)
      throw new BadRequestException(categoryMessages.CATEGORY_NOT_FOUND);

    return category;
  }

  async findBatch(ids: string[]): Promise<Category[]> {
    try {
      const categories = await this.categoryRepository.find({
        where: [...ids.map<FindOptionsWhere<Category>>((id) => ({ id: id }))],
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
    const category = await this.categoryRepository.updateCategory(
      id,
      updateCategoryDto,
    );

    return category;
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}
