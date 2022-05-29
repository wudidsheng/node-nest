import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
// 自定义装饰器
export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return data ? request.user[data] : request.user;
  },
);
