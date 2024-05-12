import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';

@Injectable()
export class CategoriesRepository implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async onModuleInit() {
    await this.addCategories();
    console.log('Categorias cargadas');
  }

  async getCategories() {
    const categories = await this.categoriesRepository.find();
    const categoriesName = categories.map((element) => ({
      name: element.name,
      product: element.products,
    }));
    return categoriesName;
  }

  async addCategories() {
    data?.map(async (element) => {
      await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values({ name: element.category })
        .orUpdate(['name'], ['name'])
        .orIgnore()
        .execute();
    });
    return 'Categorias cargadas';
  }
}
