import { Module } from '@nestjs/common';
import { FileUploadController } from './file_upload.controller';
import { FileUploadService } from './file_upload.service';
import { cloudinaryConfig } from 'src/config/cloudinary';
import { FileUploadRepository } from './file_upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FileUploadController],
  providers: [FileUploadService, cloudinaryConfig, FileUploadRepository],
})
export class FileUploadModule {}
