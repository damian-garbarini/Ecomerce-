import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file_upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file to upload',
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('uploadImage/:id')
  /*     @Roles(Role.Admin) */
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id', ParseUUIDPipe) productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El archivo es demasiado grande',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|svg|webp)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadImage(productId, file);
  }
}
