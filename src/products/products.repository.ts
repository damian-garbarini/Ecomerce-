import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { MoreThan, Repository } from 'typeorm';
import { Category } from 'src/categories/categories.entity';
import * as data from '../utils/data.json';

@Injectable()
export class ProductsRepository implements OnModuleInit {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async onModuleInit() {
    await this.addProduct();
  }
  async getProducts(page: number, limit: number): Promise<Product[]> {
    let products = await this.productsRepository.find({
      where: {
        stock: MoreThan(0),
      },
      relations: {
        category: true,
      },
    });

    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);

    return products;
  }

  async getProductById(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException(
        `No se encuentra el producto con el id ${id}`,
      );
    return product;
  }

  async addProduct() {
    const categories = await this.categoriesRepository.find();

    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );

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
        .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
        .execute();
    });
    return 'Productos cargados';
  }

  async updateProduct(id: string, product: Product) {
    await this.productsRepository.update(id, product);

    const productUpdated = await this.productsRepository.findOneBy({ id });

    if (!productUpdated)
      throw new NotFoundException(
        `No se encuentra el producto con el id ${id}`,
      );
    return productUpdated;
  }

  async deleteProduct(id: string) {
    const productDeleted = await this.productsRepository.findOneBy({ id });

    if (!productDeleted)
      throw new NotFoundException(
        `No se encuentra el producto con el id ${id}`,
      );

    this.productsRepository.remove(productDeleted);
    return productDeleted;
  }
}
