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
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateUserDto } from './UpdateUser.dto';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getAllUsers(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) {
      return this.usersService.getAllUsers(Number(page), Number(limit));
    }
    return this.usersService.getAllUsers(1, 5);
  }

  @ApiBearerAuth()
  @Get('test')
  @UseGuards(AuthGuard)
  getTest() {
    return 'testea la ruta de users';
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
