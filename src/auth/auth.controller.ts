import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './LoginUser.dto';
import { CreateUserDto } from 'src/users/CreateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signin(email, password);
  }

  @Post('signup')
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }
}
