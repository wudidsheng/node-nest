import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userDto } from './user.dto';
import { User } from './user.entity';

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
}
