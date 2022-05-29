import { userDto } from './user.dto';
import { Body, Controller, Get, Post, UseGuards, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decator/custom.decorator';

@Controller('auth')
export class AuthController {
  private log = new Logger('auth控制器');
  constructor(private authServer: AuthService) {}

  @UseGuards(AuthGuard('jwt')) //应用jwt策略
  @Get()
  getAllUser() {
    this.log.verbose('一个调试信息');
    return this.authServer.findAll();
  }
  @Post('register')
  register(@Body() body: userDto): Promise<userDto> {
    return this.authServer.register(body);
  }
  @Post('login')
  login(@Body() body: userDto): Promise<{ token: string }> {
    return this.authServer.login(body);
  }
}
