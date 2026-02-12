import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { ResponseType } from 'src/types/response.type';
import { RESPONSE_MESSAGE } from './response.decorator';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ResponseType
> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseType> {
    return next.handle().pipe(
      map((data) => {
        const message =
          this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler()) ||
          'Успешно';

        const response = context.switchToHttp().getResponse();

        return {
          success: true,
          message,
          data: data,
          status: response.statusCode,
        };
      }),
    );
  }
}
