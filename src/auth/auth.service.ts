import { use } from 'passport';
import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private log = new Logger('authService');
  constructor(
    @InjectRepository(User)
    private userDto: Repository<User>,
    private jwtServer: JwtService,
  ) {}

  async findAll(): Promise<userDto[]> {
    return this.userDto.find();
  }
  // 注册
  async register(user: userDto): Promise<userDto> {
    const userInfo = this.userDto.create(user);
    const salt = bcrypt.genSaltSync();
    const hashPwd = bcrypt.hashSync(user.password, salt);
    userInfo.password = hashPwd;
    try {
      return await this.userDto.save(userInfo);
    } catch (error) {
      // trace 错误的上下文
      this.log.error('请求出错', error.trace);
      // 重复的用户名
      if (error.code === '23505') {
        throw new ConflictException('新建用户失败');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  // 登录
  async login(user: userDto): Promise<{ token: string }> {
    const { username, password } = user;
    const userInfo = await this.userDto.findOne({ where: { username } });
    // 用户不存在
    if (!userInfo) {
      throw new NotFoundException(`当前${username}用户不存在`);
    }
    if (!(await bcrypt.compare(password, userInfo.password))) {
      throw new UnauthorizedException('用户密码错误');
    }
    return { token: this.jwtServer.sign({ id: userInfo.id }) };
  }
}
