import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file_upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly fileUploadRepository: FileUploadRepository,
  ) {}

  async uploadImage(productId: string, file: Express.Multer.File) {
    const res = await this.fileUploadRepository.uploadImage(file);
    const product = await this.productsRepository.findOneBy({ id: productId });

    if (!product)
      throw new NotFoundException(
        `No se encuentra el producto con el id ${productId}`,
      );

    await this.productsRepository.update(
      { id: productId },
      { imgUrl: res.secure_url },
    );

    const productUpdated = await this.productsRepository.findOneBy({
      id: productId,
    });

    return productUpdated;
  }
}
