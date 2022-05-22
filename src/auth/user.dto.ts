import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
export class userDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: '密码不能低于8位' })
  @MaxLength(16, { message: '密码必须少于16位' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, {
    message:
      '至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符',
  }) // 正则表达式
  password: string;
}
