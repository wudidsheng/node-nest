import { userDto } from './user.dto';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userDto: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ZZPrtfgh',
    });
  }

  async validate(data: userDto): Promise<User> {
    const { username } = data;
    //   返回用户查询信息
    const result = await this.userDto.findOne({
      where: { username },
    });
    if (!result) {
      throw new UnauthorizedException('用户token失效');
    }
    return result;
  }
}
