import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userDto: Repository<User>,
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
      // 重复的用户名
      if (error.code === '23505') {
        throw new ConflictException('新建用户失败');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  // 登录
  async login(user: userDto): Promise<string> {
    const { username, password } = user;
    const userInfo = await this.userDto.findOne({ where: { username } });
    // 用户不存在
    if (!userInfo) {
      throw new NotFoundException(`当前${username}用户不存在`);
    }
    if (!(await bcrypt.compare(password, userInfo.password))) {
      throw new UnauthorizedException('用户密码错误');
    }
    return 'ok';
  }
}
