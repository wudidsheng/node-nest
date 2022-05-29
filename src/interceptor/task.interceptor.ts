import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Request } from 'express';
import { classToPlain } from 'class-transformer';

@Injectable()
export class TaskInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp().getRequest<Request>();
    const now = Date.now();
    return next.handle().pipe(
      map((data) => classToPlain(data)),
      tap(() => console.log(`After... ${Date.now() - now}ms`)),
    );
  }
}
