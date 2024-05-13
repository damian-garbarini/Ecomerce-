import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./categories/categories.entity";
import { Repository } from "typeorm";
import * as data from "./utils/data.json";
import { Product } from "./products/products.entity";

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectRepository(Category) private categoriesRepository: Repository<Category>,
    @InjectRepository(Product) private productsRepository: Repository<Product>
  ) {}

  async onModuleInit() {
    const category = await this.categoriesRepository.find();
    if (category.length === 0) {
      await Promise.all(data.map(async (element) => {
        await this.categoriesRepository
          .createQueryBuilder()
          .insert()
          .into(Category)
          .values({ name: element.category })
          .orUpdate(["name"], ["name"])
          .orIgnore()
          .execute();
      }));
    }
    const categories = await this.categoriesRepository.find();
    await Promise.all(data.map(async (element) => {
      const category = categories.find((category) => category.name === element.category);

      const product = new Product();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.imgUrl = element.imgUrl;
      product.category = category;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .orUpdate(["description", "price", "imgUrl", "stock"], ["name"])
        .execute();
    }));
  }
}
