import { userDto } from './user.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authServer: AuthService) {}
  @Get()
  getAllUser() {
    return this.authServer.findAll();
  }
  @Post('register')
  register(@Body() body: userDto): Promise<userDto> {
    return this.authServer.register(body);
  }
  @Post('login')
  login(@Body() body: userDto): Promise<string> {
    return this.authServer.login(body);
  }
}
