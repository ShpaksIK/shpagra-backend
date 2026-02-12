import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseType } from 'src/types/response.type';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Ошибка сервера';
    let errors = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || exception.message;
        errors =
          (exceptionResponse as any).error || (exceptionResponse as any).errors;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const errorResponse: ResponseType = {
      success: false,
      message: message,
      error: errors || [message],
      status: status,
    };

    response.status(status).json(errorResponse);
  }
}
