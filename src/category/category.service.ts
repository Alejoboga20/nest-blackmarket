import { BadRequestException, Injectable } from '@nestjs/common';

import { categoryMessages } from '@common/constants/messages';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repositories/category.repository';

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
