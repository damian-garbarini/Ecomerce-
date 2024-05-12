import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(200)
  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    return this.productsService.getProducts(Number(page), Number(limit));
  }

  @Get('seeder')
  addProduct() {
    return this.productsService.addProduct();
  }

  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: any) {
    return this.productsService.updateProduct(id, product);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
