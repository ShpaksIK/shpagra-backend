import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ResponseType } from 'src/types/response.type';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }

    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    });

    if (errors.length > 0) {
      throw new BadRequestException({
        success: false,
        message: 'Валидация провалилась',
        error: this.formatErrors(errors),
      } as ResponseType);
    }

    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: any[]) {
    return errors.map((err) => {
      const constraints = err.constraints ? Object.values(err.constraints) : [];
      const childrenErrors = err.children?.length
        ? this.formatErrors(err.children)
        : [];

      return {
        property: err.property,
        constraints,
        children: childrenErrors,
      };
    });
  }
}
